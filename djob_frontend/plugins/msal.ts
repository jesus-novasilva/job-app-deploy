import { PublicClientApplication, type AuthenticationResult } from '@azure/msal-browser'
import { useUserStore } from '~/store/user';
export default defineNuxtPlugin(async () => {
    const config = {
        auth:
        {
            clientId: import.meta.env.VITE_CLIENT_ID,
            authority: 'https://login.microsoftonline.com/organizations/',
            redirectUri: import.meta.env.VITE_REDIRECT_URI,
        }
    }

    const msal = new PublicClientApplication(config)
    await msal.initialize()

    const login = async () => {
        let loginRequest = {
            scopes: ['415dd553-9b8a-41cb-995b-fc57671b1073/read']
        }
        try {
            let loginResponse = await msal.loginPopup(loginRequest)
            return loginResponse
        }
        catch (error) {
            console.log(error)
        }
    }

    let tokenResponse: AuthenticationResult

    const acquireTokenSilent = async () => {
        const account = msal.getAllAccounts()
        if (account.length > 0) {
            let tokenRequest = {
                scopes: ['415dd553-9b8a-41cb-995b-fc57671b1073/read'],
                account: account[0]
            }
            tokenResponse = await msal.acquireTokenSilent(tokenRequest)
            console.log('Token Response: ', tokenResponse)
            return tokenResponse
        } else {
            return null
        }
    }

    const getAccounts = () => {
        return msal.getAllAccounts()
    }

    const profileInfo = async () => {
        let payload = await fetch('https://graph.microsoft.com/v1.0/me', {
            headers: {
                Authorization: `Bearer ${tokenResponse.accessToken}`,
            },
        })
        let json = await payload.json()
        const email = json.mail
        const userStore: any = useUserStore()
        userStore.setToken(tokenResponse.accessToken, email)

        return json
    }


    const profileImg = async () => {
        try {
            let profileImageResponse = await fetch(
                `https://graph.microsoft.com/v1.0/me/photo/$value`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                    },
                }
            )
            let imageUrl
            if (profileImageResponse.ok) {
                let blob = await profileImageResponse.blob()
                imageUrl = URL.createObjectURL(blob)

            } else {
                console.error(
                    'Failed to fetch profile image:',
                    profileImageResponse.statusText
                )
            }
            return { data: imageUrl, error: null }
        }
        catch (error) {
            return { data: null, error: error }
        }
    }

    const logout = async () => {
        const token = await acquireTokenSilent()
        if (token) {
            const homeAccountId = token.account.homeAccountId
            const currentAccount = msal.getAccount({homeAccountId})
            const userStore: any = useUserStore()
            userStore.removeToken()
            await msal.logoutRedirect({ account: currentAccount })
        } else {
            console.error("Cant't get the token")
        }
    }
    
    return {
        provide: {
            login,
            acquireTokenSilent,
            getAccounts,
            profileInfo,
            profileImg,
            logout
        }
    }

})


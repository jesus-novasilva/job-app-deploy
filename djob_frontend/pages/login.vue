<!-- <script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore()
const links = ref([
  { title: "Home", to: "/" },
  { title: "Log in", to: "/login" },
]);
let errors = ref([]);

const { $login } = useNuxtApp();
const loginUser = async () => {
  clearSiteData();
  const loginResponse = await $login();
  if (loginResponse) {
    navigateTo("/myjobs");
  }
};
function clearSiteData() {
  document.cookie.split(";").forEach((cookie) => {
    const [name, _] = cookie.split("=").map((c) => c.trim());
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  localStorage.clear();
  sessionStorage.clear();
}

useSeoMeta({
  title: "Log in",
  ogTitle: "Log in",
  description: "description",
});
</script>

<template> 
  <div>
    <v-breadcrumbs :items="links" class="cursor-pointer mt-10 text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-container class="mt-10 pa-16">
      <v-card
        elevation="4"
        class="pa-16 bg-blue-grey-lighten-0"
        variant="tonal"
      >
        <h1>Log in</h1>
        
          <ClientOnly >
          <v-row class="mt-0">
            <v-col xs="12" md="12">
              <v-btn
                @click="loginUser"
                class="text-body-1 font-weight-bold py-6 px-10 d-flex bg-blue-grey-lighten-1"
                >Login with Microsoft 365</v-btn
              >
            </v-col>
            <v-col xs="12" md="12">
              <NuxtLink to="/signup" class="text-decoration-none text-black"
                >Don't have an account?
                <strong class="cursor-pointer">Click here</strong></NuxtLink
              >
            </v-col>
            <v-col
              xs="12" md="12"
              v-if="errors.length"
              class="rounded-lg bg-red-lighten-2"
            >
              <p v-for="error in errors" :key="error">{{ error }}</p>
            </v-col>
          </v-row>
        </ClientOnly>
        
      </v-card>
    </v-container>
  </div>
</template> -->

<script setup>
  import { useUserStore } from '~/store/user';

  const router = useRouter()
  const userStore = useUserStore()
  const links = ref([
    { title: 'Home', to: '/' }, 
    { title: 'Log in', to: '/login' }
  ])

  let email = ref('')
  let password = ref('')
  let errors = ref([])

  const submitForm = async () => {
    errors.value = []

    await $fetch('http://127.0.0.1:8000/api/v1/token/login/', {
      method: 'POST',
      body:{
        username: email.value,
        password: password.value
      }
    })
    .then(data => {
      userStore.setToken(data.auth_token, email.value)

      router.push({path: '/myjobs'})
    })
    .catch(error => {
      if(error.response) {
        for (const property in error.response._data){
          errors.value.push(`${property}: ${error.response._data[property]}`)
        }
        console.log(JSON.stringify(error.response));
      } else if (error.message){
        errors.value.push('Somethong went wrog. Please try again')
        console.log(JSON.stringify(error));
      }
    })
  }
  useSeoMeta({
  title: 'Log in',
  ogTitle: 'Log in',
  description: 'description'
})


</script>

<template>
  <div>
  <v-breadcrumbs :items="links" class="cursor-pointer mt-10  text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-container class="mt-10 pa-16">
    <v-card elevation="4" class="pa-16 bg-blue-grey-lighten-0" variant="tonal">
      <h1>Log in</h1>
      <v-form v-on:submit.prevent="submitForm" class="mt-5">
        <v-row>
          <v-col md="12">
            <v-text-field label="Your email address..."
              v-model="email"
              type="email"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col md="12">
            <v-text-field
              label="Your password..."
              v-model="password"
              type="password"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col md="12" class="d-flex justify-space-between">
            <v-checkbox
            label="Remember me"
            ></v-checkbox>
            <p class="mt-5 cursor-pointer">Forgot password?</p>
          </v-col>
          <v-col md="12">
              <v-btn type="submit"
               class="text-body-1 font-weight-bold py-6 px-10 d-flex bg-blue-grey-lighten-1"
               >Submit</v-btn>
          </v-col>
          <v-col md="12">
              <NuxtLink to="/signup" class="text-decoration-none text-black">Don't have an account? <strong class="cursor-pointer">Click here</strong></NuxtLink>
            </v-col>
          <v-col md="12" v-if="errors.length"
            class="rounded-lg bg-red-lighten-2"
            >
              <p v-for="error in errors"
              :key="error"
              >{{ error }}</p>
            </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</div>
</template>
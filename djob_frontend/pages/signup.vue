<script setup>
  const router = useRouter()
  let email = ref('')
  let password = ref('')
  let confirmPassword = ref('')
  let errors = ref([])
  const links = ref([
    { title: 'Home', to: '/' }, 
    { title: 'Sign up', to: '/signup' }
  ])

  useSeoMeta({
  title: 'Sign up',
  ogTitle: 'Sign up',
  description: 'The description'
})

  const submitForm = async () => {
    errors.value = []

    await $fetch('http://localhost:8000/api/v1/users/', {
      method: 'POST',
      body:{
        username: email.value,
        password: password.value
      }
    })
    .then(response => {
      console.log('response', response)
      router.push({path: '/login'})
    })
    .catch(error => {
      if(error.response) {
        for (const property in error.response._data){
          errors.value.push(`${property}: ${error.response._data[property]}`)
        }
        console.log(JSON.stringify(error.response));
      } else if (error.message){
        errors.value.push('Something went wrong. Please try again')
        console.log(JSON.stringify(error));
      }
    })
  }
</script>

<template>
  <div>
    <v-breadcrumbs :items="links" class="cursor-pointer mt-10 text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <v-container class="mt-10 pa-16">
      <v-card elevation="4" class="pa-16 bg-blue-grey-lighten-0" variant="tonal">
        <h1>Sign up</h1>
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
            <v-col md="12">
              <v-text-field
                label="Repeat password..."
                v-model="confirmPassword"
                type="password"
                hide-details
                required
              ></v-text-field>
            </v-col>
            <v-col md="12" v-if="errors.length"
            class="rounded-lg bg-red-lighten-2"
            >
              <p v-for="error in errors"
              :key="error"
              >{{ error }}</p>
            </v-col>

            <v-col md="12">
                <v-btn type="submit" class="text-body-1 font-weight-bold py-6 px-10 d-flex bg-blue-grey-lighten-1">Submit</v-btn>
            </v-col >
            <v-col md="12">
              <NuxtLink to="/login" class="text-decoration-none text-black"><strong class="cursor-pointer">Click here</strong> if you have an account</NuxtLink>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>
  </div>
  </template>

  
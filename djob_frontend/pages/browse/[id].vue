<!-- <script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore()
const route = useRoute()
const links = ref([
  { title: 'Home', to: '/' }, 
  { title: 'Browse', to: '/browse' },
  { title: '', to: '/'},
  ])

const {data: job} = await useFetch('http://localhost:8000/api/v1/jobs/' + route.params.id + '/',  {
      headers: {
        'Authorization': 'Bearer ' + userStore.user.token,
        'Content-Type': 'application/json'
      }
    })
  
links.value[2].title = job.value.title

useSeoMeta({
  title: job.value.title,
  ogTitle: job.value.title,
  description: job.value.description
})
</script>

<template>
  <div>
    <v-breadcrumbs :items="links" class="cursor-pointer mt-10 text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-row class="pa-8">
    <v-col class="d-flex flex-column ga-6">
      <h1>{{ job.title }}</h1>
      <p>{{ job.description }}</p>
      <a :href="'mailto:' + job.company_email"></a>
      <v-btn class="w-0 py-6 px-10 d-flex" variant="tonal"
        ><a href="#" class="text-decoration-none text-black text-body-1"
          >Apply</a
        ></v-btn
      >
    </v-col>
    <v-col class="d-flex flex-column">
      <v-card elevation="4" class="pa-6 bg-blue-grey-lighten-2" variant="tonal">
        <h3 class="mb-6 text-h5">Company</h3>
        <p class="mb-4">{{ job.company_name }}</p>
        <p>{{ job.company_location }}</p>
        <hr class="my-7">
      <h3 class="mb-6 text-h5">Position</h3>
        <p class="mb-4">{{ job.position_location }}</p>
        <p>{{ job.position_salary }}</p>
        <hr class="my-7">
        <p class="mb-4">Posted at {{ job.created_at_formatted }}</p>
      </v-card>
      
    </v-col>
  </v-row>
</div>
</template> -->

<script setup>

const route = useRoute()
const links = ref([
  { title: 'Home', to: '/' }, 
  { title: 'Browse', to: '/browse' },
  { title: '', to: '/'},
  ])

const {data: job} = await useFetch('http://127.0.0.1:8000/api/v1/jobs/' + route.params.id + '/' )
  
links.value[2].title = job.value.title

useSeoMeta({
  title: job.value.title,
  ogTitle: job.value.title,
  description: job.value.description
})
</script>

<template>
  <div>
    <v-breadcrumbs :items="links" class="cursor-pointer mt-10 text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  <v-row class="pa-8">
    <v-col class="d-flex flex-column ga-6">
      <h1>{{ job.title }}</h1>
      <p>{{ job.description }}</p>
      <a :href="'mailto:' + job.company_email"></a>
      <v-btn class="w-0 py-6 px-10 d-flex" variant="tonal"
        ><a href="#" class="text-decoration-none text-black text-body-1"
          >Apply</a
        ></v-btn
      >
    </v-col>
    <v-col class="d-flex flex-column">
      <v-card elevation="4" class="pa-6 bg-blue-grey-lighten-2" variant="tonal">
        <h3 class="mb-6 text-h5">Company</h3>
        <p class="mb-4">{{ job.company_name }}</p>
        <p>{{ job.company_location }}</p>
        <hr class="my-7">
      <h3 class="mb-6 text-h5">Position</h3>
        <p class="mb-4">{{ job.position_location }}</p>
        <p>{{ job.position_salary }}</p>
        <hr class="my-7">
        <p class="mb-4">Posted at {{ job.created_at_formatted }}</p>
      </v-card>
      
    </v-col>
  </v-row>
</div>
</template>
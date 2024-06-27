<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore()
const router = useRouter()
let jobs = ref()
const links = ref([
    { title: 'Home', to: '/' }, 
    { title: 'My jobs', to: '/myjobs' }
  ])

onMounted( () => {
  if(!userStore.user.isAuthenticated){
    router.push('/login')
  } else {
    getJobs()
  }
} ) 

useSeoMeta({
  title: 'My jobs',
  ogTitle: 'My jobs',
  description: 'The description'
})


const getJobs = async () => {
  await $fetch('http://127.0.0.1:8000/api/v1/jobs/my/', {
      headers: {
        'Authorization': 'token ' + userStore.user.token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      jobs.value = response
    })
    .catch(error => {
      console.log('error', error);
    })
}

// const getJobs = async () => {
//   await $fetch('http://localhost:8000/api/v1/jobs/my/', {
//       headers: {
//         'Authorization': 'Bearer ' + userStore.user.token,
//         'Content-Type': 'application/json'
//       }
      
//     })
//     .then(response => {
//       jobs.value = response
//     })
//     .catch(error => {
//       console.log('error', error);
//     })
// }

const deleteJob = (id) => {
  jobs.value = jobs.value.filter(job => job.id !== id)
}
</script>

<template>
  <div>
    <v-breadcrumbs :items="links" class="cursor-pointer mt-10 text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
   
  
  <v-container class="my-10">
    <h2 class="text-center text-h4 mb-8">My jobs</h2>
    <div class="d-flex flex-column ga-4">
      <Job
      v-for="job in jobs"
      :key="job.id"
      :job="job"
      v-on:deleteJob="$event => deleteJob(job.id)"
      :my="true"/>
    </div>
  </v-container>
</div>
</template>

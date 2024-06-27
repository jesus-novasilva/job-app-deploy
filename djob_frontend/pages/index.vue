<!-- <script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore()
const { $profileInfo } = useNuxtApp();
const profile = ref();
const loading = ref(true);
const { data: jobs } = await useFetch(
  "http://localhost:8000/api/v1/jobs/newest/",  {
      headers: {
        'Authorization': 'Bearer ' + userStore.user.token,
        'Content-Type': 'application/json'
      }
    }
);

useSeoMeta({
  title: "Home - Djob",
  ogTitle: "Home - Djob",
  description: "The description",
});

onMounted(async () => {
  loading.value = true
  const profileInfo = await $profileInfo()
  profile.value = profileInfo

const initials = ref();
const getInitials = () => {
  const nameArray = profile.value.displayName.split(" ");
  const fletter = nameArray[0].charAt(0);
  const lletter = nameArray[1].charAt(0);
  initials.value = fletter + lletter;
};

})
</script>

<template>
  <div class="">
    <v-container v-if="loading" class="loadData">
      <div class="loader"></div>
    </v-container>
    <v-container fluid v-else class="pt-16 px-6 text-center">
      <h1 class="text-size">Find a job anywhere</h1>
    </v-container>
    <v-container fluid class="text-center">
      <h2>{{profile.displayName}}</h2>
      <h4>{{profile.mail}}</h4> 
    </v-container>
    <v-container fluid class="py-8 px-6">
      <h2 class="text-size2 my-8 text-center">Newest jobs</h2>
      <v-row>
        <v-col v-for="job in jobs" :key="job.id" cols="12" xl="6" md="12">
          <Job :job="job" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.text-size, .text-size2{
  font-weight: 500;
}

.text-size {
  font-size: 6rem;
}
.text-size2{
  font-size: 2rem;
}
@media (max-width: 500px) {
  .text-size {
    font-size: 4rem;
  }
  .text-size2{
  font-size: 1.5rem;
}
}
</style> -->

<script setup>
const { data: jobs } = await useFetch(
  "http://127.0.0.1:8000/api/v1/jobs/newest/"
);

useSeoMeta({
  title: "Home - Djob",
  ogTitle: "Home - Djob",
  description: "The description",
});
</script>

<template>
  <div class="">
    <v-container fluid class="pt-16 px-6 text-center">
      <h1 class="text-size">Find a job anywhere</h1>
    </v-container>
    <v-container fluid class="py-8 px-6">
      <h2 class="text-size2 my-8 text-center">Newest jobs</h2>
      <v-row>
        <v-col v-for="job in jobs" :key="job.id" cols="12" xl="6" md="12">
          <Job :job="job" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.text-size, .text-size2{
  font-weight: 500;
}

.text-size {
  font-size: 6rem;
}
.text-size2{
  font-size: 2rem;
}
@media (max-width: 500px) {
  .text-size {
    font-size: 4rem;
  }
  .text-size2{
  font-size: 1.5rem;
}
}
</style>
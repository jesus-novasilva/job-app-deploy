<script setup>
import { useUserStore } from "~/store/user";


const emit = defineEmits(["deleteJob"]);

const userStore = useUserStore();


const props = defineProps({
  my: {
    type: [Boolean],
  },
  job: {
    type: [Object],
  },
});

const justifyClass = computed(() => {
  return props.my ? 'justify-start' : 'justify-center'
})

const deleteJob = async (id) => {
  await $fetch("http://localhost:8000/api/v1/jobs/" + id + "/delete/", {
    method: "DELETE",
    headers: {
      Authorization: "token " + userStore.user.token,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      emit("deleteJob", id);
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>

<template>
  <v-card elevation="4" class="py-8 px-6" variant="tonal">
    <v-row>
      <v-col cols="4">
        <h3 class="text-h5 mb-2">{{ job.title }}</h3>
        <p>{{ job.company_name }}</p>
      </v-col>
      <v-col cols="2">
        <p class="mb-2">{{ job.position_location }}</p>
        <p>${{ job.position_salary }}</p>
      </v-col>
      <v-col :class="['d-flex', 'align-center', 'ga-2', justifyClass]" cols="4">
        <p>Posted {{ job.created_at_formatted }}</p>
      </v-col>
      <v-col class="d-flex align-center justify-end  ga-2" cols="2">
        <NuxtLink
          :to="'/browse/' + job.id"
          class="text-decoration-none inline-block text-h5"
        >
          <v-btn
            class="text-black px-4 text-body-1"
            variant="tonal"
            size="x-large"
            >Details</v-btn
          >
        </NuxtLink>
        <NuxtLink
          :to="'/editjob/' + job.id"
          class="text-decoration-none inline-block text-h5"
        >
          <v-btn
            class="text-black px-4 text-body-1 bg-blue-lighten-3"
            variant="tonal"
            size="x-large"
            v-if="my"
            >Edit</v-btn
          >
        </NuxtLink>
        <v-btn
          class="text-black px-4 text-body-1 bg-red-lighten-3"
          variant="tonal"
          size="x-large"
          v-if="my"
          @click="deleteJob(job.id)"
          >Delete</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

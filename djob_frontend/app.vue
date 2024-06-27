<script setup>
import {onMounted} from 'vue'
import { useUserStore } from '~/store/user';

const userStore = useUserStore()

onMounted( () => {
  userStore.initStore()
} ) 

</script>

<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
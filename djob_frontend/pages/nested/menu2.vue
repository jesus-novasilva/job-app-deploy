<script setup>
const links = ref([
    { title: 'Home', to: '/' }, 
    { title: 'Nested', to: '/' }, // Put later the right link to the right folder
    { title: 'Menu 2', to: '/nested/menu2' },
  ])
</script>

<template>
    <div>
        <v-breadcrumbs :items="links" class="cursor-pointer mt-10 text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
        <h1 class="mt-15 text-h1 text-center">Menu 2</h1>
    </div>
</template>
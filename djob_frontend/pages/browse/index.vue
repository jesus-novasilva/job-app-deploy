<!-- <script setup>
import { useUserStore } from '~/store/user';
const userStore = useUserStore()
// Query
const queryRef = ref('');
let query = '';
const links = ref([
    { title: 'Home', to: '/' }, 
    { title: 'Browse', to: '/browse' }
  ])

const performSearch = () => {
  queryRef.value = query;
};
console.log(query);

// Categories
const { data: jobCategories } = await useFetch(
  "http://localhost:8000/api/v1/jobs/categories/", {
    headers: {
      'Authorization': 'Bearer ' + userStore.user.token,
      'Content-Type': 'application/json'
    }
  }
);
const selectedCategoriesRef = ref('');
const selectedCategories = [];

const toggleCategory = (id) => {
  const index = selectedCategories.indexOf(id);

  if (index === -1) {
    selectedCategories.push(id);
  } else {
    selectedCategories.splice(index, 1);
  }

  selectedCategoriesRef.value = selectedCategories.join(",");
};

// Jobs
const { data: jobs } = await useFetch("http://127.0.0.1:8000/api/v1/jobs/", {
  query: { query: queryRef, categories: selectedCategoriesRef,
    headers: {
      'Authorization': 'Bearer ' + userStore.user.token,
      'Content-Type': 'application/json'
    }
   },
});

useSeoMeta({
  title: 'Browse jobs',
  ogTitle: 'Browse jobs',
  description: 'description'
})
</script>

<template>
  <div>
    <v-breadcrumbs :items="links" class="cursor-pointer mt-10 text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  
  <v-container fluid>
    <v-row class="mt-5">
      <v-col md="3" sm="12">
        <v-card
          elevation="4"
          class="pa-6 bg-blue-grey-lighten-2"
          variant="tonal"
        >
          <div class="d-flex ga-2">
            <v-text-field
              type="search"
              label="Find a job..."
              v-model="query"
              outlined
            ></v-text-field>
            <v-btn @click="performSearch" class="mt-2" size="large">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
          <hr />
          <h3 class="mt-3">Categories</h3>
          <div class="mt-5 ps-5 d-flex flex-column ga-12">
            <p
              v-for="category in jobCategories"
              :key="category.id"
              v-on:click="($event) => toggleCategory(category.id)"
              class="cursor-pointer py-3 ps-5 rounded-pill"
              :class="{
                'bg-blue-grey-lighten-5': selectedCategoriesRef.includes(
                  category.id
                ),
              }"
            >
              {{ category.title }}
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col md="9" sm="12">
        <v-container class="pa-0" fluid>
          <div class="d-flex flex-column ga-4">
            <Job v-for="job in jobs" :key="job.id" :job="job" />
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</div>
</template> -->


<script setup>
// Query
const queryRef = ref('');
let query = '';
const links = ref([
    { title: 'Home', to: '/' }, 
    { title: 'Browse', to: '/browse' }
  ])

const performSearch = () => {
  queryRef.value = query;
};
console.log(query);

// Categories
const { data: jobCategories } = await useFetch(
  "http://127.0.0.1:8000/api/v1/jobs/categories/"
);
const selectedCategoriesRef = ref('');
const selectedCategories = [];

const toggleCategory = (id) => {
  const index = selectedCategories.indexOf(id);

  if (index === -1) {
    selectedCategories.push(id);
  } else {
    selectedCategories.splice(index, 1);
  }

  selectedCategoriesRef.value = selectedCategories.join(",");
};

// Jobs
const { data: jobs } = await useFetch("http://127.0.0.1:8000/api/v1/jobs/", {
  query: { query: queryRef, categories: selectedCategoriesRef },
});

useSeoMeta({
  title: 'Browse jobs',
  ogTitle: 'Browse jobs',
  description: 'description'
})
</script>

<template>
  <div>
    <v-breadcrumbs :items="links" class="cursor-pointer mt-10 text-h6">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
  
  <v-container fluid>
    <v-row class="mt-5">
      <v-col md="3" sm="12">
        <v-card
          elevation="4"
          class="pa-6 bg-blue-grey-lighten-2"
          variant="tonal"
        >
          <div class="d-flex ga-2">
            <v-text-field
              type="search"
              label="Find a job..."
              v-model="query"
              outlined
            ></v-text-field>
            <v-btn @click="performSearch" class="mt-2" size="large">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
          <hr />
          <h3 class="mt-3">Categories</h3>
          <div class="mt-5 ps-5 d-flex flex-column ga-12">
            <p
              v-for="category in jobCategories"
              :key="category.id"
              v-on:click="($event) => toggleCategory(category.id)"
              class="cursor-pointer py-3 ps-5 rounded-pill"
              :class="{
                'bg-blue-grey-lighten-5': selectedCategoriesRef.includes(
                  category.id
                ),
              }"
            >
              {{ category.title }}
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col md="9" sm="12">
        <v-container class="pa-0" fluid>
          <div class="d-flex flex-column ga-4">
            <Job v-for="job in jobs" :key="job.id" :job="job" />
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>
<!-- <script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const router = useRouter();
const links = ref([
    { title: 'Home', to: '/' }, 
    { title: 'Create a job', to: '/createjob' }
  ])

onMounted(() => {
  if (!userStore.user.isAuthenticated) {
    router.push("/login");
  }
});
const { data: jobCategories } = await useFetch(
  "http://localhost:8000/api/v1/jobs/categories/",
  {
      headers: {
        'Authorization': 'Bearer ' + userStore.user.token,
        'Content-Type': 'application/json'
      }
    }
);
let category = ref("");
let title = ref("");
let description = ref("");
let position_salary = ref("");
let position_location = ref("");
let company_name = ref("");
let company_location = ref("");
let company_email = ref("");
let errors = ref([]);

const submitForm = async () => {
  errors.value = [];

  if (category.value == '') { errors.value.push('You must select a category')}
  if (title.value == '') { errors.value.push('The title field is missing')}
  if (description.value == '') { errors.value.push('The description field is missing')}
  if (position_salary.value == '') { errors.value.push('The position salary field is missing')}
  if (position_location.value == '') { errors.value.push('The position location field is missing')}
  if (company_name.value == '') { errors.value.push('The company name field is missing')}
  if (company_location.value == '') { errors.value.push('The company location field is missing')}
  if (company_email.value == '') { errors.value.push('The company email field is missing')}

  if(errors.value.length == 0) {
    await $fetch("http://localhost:8000/api/v1/jobs/create/", {
    method: "POST",
    headers: {
                'Authorization': 'Bearer ' + userStore.user.token,
                'Content-Type': 'application/json'
    },
    body: {
      category: category.value,
      title: title.value,
      description: description.value,
      position_salary: position_salary.value,
      position_location: position_location.value,
      company_name: company_name.value,
      company_location: company_location.value,
      company_email: company_email.value
    },
  })
    .then((response) => {
      router.push({ path: "/myjobs" });
    })
    .catch((error) => {
      if (error.response) {
        for (const property in error.response._data) {
          errors.value.push(`${property}: ${error.response._data[property]}`);
        }
        console.log(JSON.stringify(error.response));
      } else if (error.message) {
        errors.value.push("Something went wrong. Please try again");
        console.log(JSON.stringify(error));
      }
    });
  }
};

useSeoMeta({
  title: 'Create a job',
  ogTitle: 'Create a job',
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
  
  <v-container class="my-16">
    <h2 class="text-center text-h4">Create job</h2>
    <v-form v-on:submit.prevent="submitForm" class="mt-5">
      <v-row>
        <v-col md="12">
          <label class="text-h6">Category</label>
          <v-select
            v-model="category"
            :items="jobCategories"
            item-value="id"
            item-text="title"
            class="mt-3"
            density="comfortable"
            label="Select category"
          >
          </v-select>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Title</label>
          <v-text-field
            class="mt-3"
            v-model="title"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Description</label>
          <v-textarea
            class="mt-3"
            v-model="description"
            density="comfortable"
            auto-grow
            required
          ></v-textarea>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Salary</label>
          <v-text-field
            class="mt-3"
            v-model="position_salary"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Location</label>
          <v-text-field
            class="mt-3"
            v-model="position_location"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Company name</label>
          <v-text-field
            class="mt-3"
            v-model="company_name"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Company location</label>
          <v-text-field
            class="mt-3"
            v-model="company_location"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Company e-mail</label>
          <v-text-field
            class="mt-3"
            v-model="company_email"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <v-btn
            type="submit"
            class="text-body-1 font-weight-bold py-5 px-8 d-flex bg-blue-grey-lighten-1"
            >Submit</v-btn
          >
        </v-col>
        <v-col md="12" v-if="errors.length" class="rounded-lg bg-red-lighten-2">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</div>
</template> -->

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "~/store/user";

const userStore = useUserStore();
const router = useRouter();
const links = ref([
    { title: 'Home', to: '/' }, 
    { title: 'Create a job', to: '/createjob' }
  ])

onMounted(() => {
  if (!userStore.user.isAuthenticated) {
    router.push("/login");
  }
});
const { data: jobCategories } = await useFetch(
  "http://127.0.0.1:8000/api/v1/jobs/categories/"
);
let category = ref("");
let title = ref("");
let description = ref("");
let position_salary = ref("");
let position_location = ref("");
let company_name = ref("");
let company_location = ref("");
let company_email = ref("");
let errors = ref([]);

const submitForm = async () => {
  errors.value = [];

  if (category.value == '') { errors.value.push('You must select a category')}
  if (title.value == '') { errors.value.push('The title field is missing')}
  if (description.value == '') { errors.value.push('The description field is missing')}
  if (position_salary.value == '') { errors.value.push('The position salary field is missing')}
  if (position_location.value == '') { errors.value.push('The position location field is missing')}
  if (company_name.value == '') { errors.value.push('The company name field is missing')}
  if (company_location.value == '') { errors.value.push('The company location field is missing')}
  if (company_email.value == '') { errors.value.push('The company email field is missing')}

  if(errors.value.length == 0) {
    await $fetch("http://127.0.0.1:8000/api/v1/jobs/create/", {
    method: "POST",
    headers: {
                'Authorization': 'token ' + userStore.user.token,
                'Content-Type': 'application/json'
    },
    body: {
      category: category.value,
      title: title.value,
      description: description.value,
      position_salary: position_salary.value,
      position_location: position_location.value,
      company_name: company_name.value,
      company_location: company_location.value,
      company_email: company_email.value
    },
  })
    .then((response) => {
      router.push({ path: "/myjobs" });
    })
    .catch((error) => {
      if (error.response) {
        for (const property in error.response._data) {
          errors.value.push(`${property}: ${error.response._data[property]}`);
        }
        console.log(JSON.stringify(error.response));
      } else if (error.message) {
        errors.value.push("Something went wrong. Please try again");
        console.log(JSON.stringify(error));
      }
    });
  }
};

useSeoMeta({
  title: 'Create a job',
  ogTitle: 'Create a job',
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
  
  <v-container class="my-16">
    <h2 class="text-center text-h4">Create job</h2>
    <v-form v-on:submit.prevent="submitForm" class="mt-5">
      <v-row>
        <v-col md="12">
          <label class="text-h6">Category</label>
          <v-select
            v-model="category"
            :items="jobCategories"
            item-value="id"
            item-text="title"
            class="mt-3"
            density="comfortable"
            label="Select category"
          >
          </v-select>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Title</label>
          <v-text-field
            class="mt-3"
            v-model="title"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Description</label>
          <v-textarea
            class="mt-3"
            v-model="description"
            density="comfortable"
            auto-grow
            required
          ></v-textarea>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Salary</label>
          <v-text-field
            class="mt-3"
            v-model="position_salary"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Location</label>
          <v-text-field
            class="mt-3"
            v-model="position_location"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Company name</label>
          <v-text-field
            class="mt-3"
            v-model="company_name"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Company location</label>
          <v-text-field
            class="mt-3"
            v-model="company_location"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <label class="text-h6">Company e-mail</label>
          <v-text-field
            class="mt-3"
            v-model="company_email"
            density="comfortable"
            required
          ></v-text-field>
        </v-col>
        <v-col md="12">
          <v-btn
            type="submit"
            class="text-body-1 font-weight-bold py-5 px-8 d-flex bg-blue-grey-lighten-1"
            >Submit</v-btn
          >
        </v-col>
        <v-col md="12" v-if="errors.length" class="rounded-lg bg-red-lighten-2">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</div>
</template>
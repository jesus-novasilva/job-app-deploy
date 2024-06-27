 <!-- <script setup>
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const router = useRouter();
const drawer = ref(false);
const showFooter = ref(false);
const {$logout} = useNuxtApp()
 

const logout = async() => {
  await $logout()
  router.push("/");
};

const watchFooter = (value) => {
  showFooter.value = value;
};
</script>
<template>
  <div>
    <v-app>
      <v-app-bar app class="px-4 py-2" color="blue-grey-darken-2" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-center">
          <NuxtLink to="/" class="text-decoration-none text-h3 text-white">
            Djob
          </NuxtLink>
        </v-toolbar-title>
        <div>
          <NuxtLink to="/" class="text-decoration-none text-h5 text-white me-1">
            Home
          </NuxtLink>
        </div>
      </v-app-bar>
      
      <v-navigation-drawer
        v-model="drawer"
        expand-on-hover
        width="300"
        rail
        app
        @mouseenter="watchFooter(true)"
        @mouseleave="watchFooter(false)"
      >
        <template v-if="userStore.user.isAuthenticated">
          <v-list
            density="compact"
            nav
            class="d-flex flex-column ga-4 mt-6 text-h6"
          >
            <v-list-item to="/browse" prepend-icon="mdi-magnify">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Browse</span>
              </template>
            </v-list-item>

            <v-list-item
              to="/inbox"
              prepend-icon="mdi-email"
              v-bind="attrs"
              v-on="on"
            >
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Inbox</span>
              </template>
            </v-list-item>

            <v-list-item to="/myjobs" prepend-icon="mdi-ballot">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">My jobs</span>
              </template>
            </v-list-item>
            <v-list-item to="/createjob" prepend-icon="mdi-folder-plus">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Create job</span>
              </template>
            </v-list-item>

             <v-list-group value="Nested">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-folder-multiple"
                  ><template v-slot:title>
                    <span class="text-h6 cursor-pointer">Nested</span>
                  </template></v-list-item
                >
              </template>
              <v-list-item
                to="/nested/menu1"
                v-bind="props"
                prepend-icon="mdi-folder"
                ><template v-slot:title>
                  <span class="text-h6 cursor-pointer">Menu 1</span>
                </template></v-list-item
              >
              <v-list-item
                to="/nested/menu2"
                v-bind="props"
                prepend-icon="mdi-folder"
                ><template v-slot:title>
                  <span class="text-h6 cursor-pointer">Menu 2</span>
                </template></v-list-item
              >

              <v-list-group value="Nested2">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-folder-multiple"
                  >
                    <template v-slot:title>
                      <span class="text-h6 cursor-pointer">Nested 2</span>
                    </template>
                  </v-list-item>
                </template>
                <v-list-item
                  to="/nested/nested2/menu2-1"
                  v-bind="props"
                  prepend-icon="mdi-folder"
                  ><template v-slot:title>
                    <span class="text-h6 cursor-pointer">Menu 2-1</span>
                  </template></v-list-item
                >
                <v-list-item
                  to="/nested/nested2/menu2-2"
                  v-bind="props"
                  prepend-icon="mdi-folder"
                  ><template v-slot:title>
                    <span class="text-h6 cursor-pointer">Menu 2-2</span>
                  </template></v-list-item
                >
              </v-list-group>
            </v-list-group> 

            <v-list-item prepend-icon="mdi-logout" @click="logout">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Log out</span>
              </template>
            </v-list-item>
          </v-list>
        </template>
        <template v-else>
          <v-list
            density="compact"
            nav
            class="d-flex flex-column ga-4 mt-6 text-h6"
          >
            <v-list-item to="/browse" prepend-icon="mdi-magnify">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Browse</span>
              </template>
            </v-list-item>
            <v-list-item to="/signup" prepend-icon="mdi-account-arrow-right">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Sign up</span>
              </template>
            </v-list-item>
            <v-list-item to="/login" prepend-icon="mdi-login">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Log in</span>
              </template>
            </v-list-item>
          </v-list>
        </template>
        <v-spacer></v-spacer>
        <template #append>
          <v-list v-if="showFooter">
            <v-list-item prepend-icon="mdi-help-circle">
              <template v-slot:title>
                <span class="text-body-title-1 cursor-pointer"
                  >Help & Support</span
                >
              </template>
            </v-list-item>
            <v-list-item>
              <hr />
              <div class="text-caption py-5 text-no-wrap">
                <h3>
                  Copyright &copy; {{ new Date().getFullYear() }} -
                  <strong>Djob</strong>
                </h3>
              </div>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
      <v-main app>
        <slot />
      </v-main>
    </v-app>
  </div>
</template> -->


<script setup>
import { useUserStore } from "../store/user";

const userStore = useUserStore();
const router = useRouter();
const drawer = ref(false);
const showFooter = ref(false);

const logout = () => {
  userStore.removeToken();
  router.push("/");
};

const watchFooter = (value) => {
  showFooter.value = value;
};
</script>
<template>
  <div>
    <v-app>
      <v-app-bar app class="px-4 py-2" color="blue-grey-darken-2" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-center">
          <NuxtLink to="/" class="text-decoration-none text-h3 text-white">
            Djob
          </NuxtLink>
        </v-toolbar-title>
        <div>
          <NuxtLink to="/" class="text-decoration-none text-h5 text-white me-1">
            Home
          </NuxtLink>
        </div>
      </v-app-bar>
      
      <v-navigation-drawer
        v-model="drawer"
        expand-on-hover
        width="300"
        rail
        app
        @mouseenter="watchFooter(true)"
        @mouseleave="watchFooter(false)"
      >
        <template v-if="userStore.user.isAuthenticated">
          <v-list
            density="compact"
            nav
            class="d-flex flex-column ga-4 mt-6 text-h6"
          >
            <v-list-item to="/browse" prepend-icon="mdi-magnify">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Browse</span>
              </template>
            </v-list-item>

            <v-list-item
              to="/inbox"
              prepend-icon="mdi-email"
              v-bind="attrs"
              v-on="on"
            >
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Inbox</span>
              </template>
            </v-list-item>

            <v-list-item to="/myjobs" prepend-icon="mdi-ballot">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">My jobs</span>
              </template>
            </v-list-item>
            <v-list-item to="/createjob" prepend-icon="mdi-folder-plus">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Create job</span>
              </template>
            </v-list-item>

            <v-list-group value="Nested">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" prepend-icon="mdi-folder-multiple"
                  ><template v-slot:title>
                    <span class="text-h6 cursor-pointer">Nested</span>
                  </template></v-list-item
                >
              </template>
              <v-list-item
                to="/nested/menu1"
                v-bind="props"
                prepend-icon="mdi-folder"
                ><template v-slot:title>
                  <span class="text-h6 cursor-pointer">Menu 1</span>
                </template></v-list-item
              >
              <v-list-item
                to="/nested/menu2"
                v-bind="props"
                prepend-icon="mdi-folder"
                ><template v-slot:title>
                  <span class="text-h6 cursor-pointer">Menu 2</span>
                </template></v-list-item
              >

              <v-list-group value="Nested2">
                <template v-slot:activator="{ props }">
                  <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-folder-multiple"
                  >
                    <template v-slot:title>
                      <span class="text-h6 cursor-pointer">Nested 2</span>
                    </template>
                  </v-list-item>
                </template>
                <v-list-item
                  to="/nested/nested2/menu2-1"
                  v-bind="props"
                  prepend-icon="mdi-folder"
                  ><template v-slot:title>
                    <span class="text-h6 cursor-pointer">Menu 2-1</span>
                  </template></v-list-item
                >
                <v-list-item
                  to="/nested/nested2/menu2-2"
                  v-bind="props"
                  prepend-icon="mdi-folder"
                  ><template v-slot:title>
                    <span class="text-h6 cursor-pointer">Menu 2-2</span>
                  </template></v-list-item
                >
              </v-list-group>
            </v-list-group>

            <v-list-item prepend-icon="mdi-logout" @click="logout">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Log out</span>
              </template>
            </v-list-item>
          </v-list>
        </template>
        <template v-else>
          <v-list
            density="compact"
            nav
            class="d-flex flex-column ga-4 mt-6 text-h6"
          >
            <v-list-item to="/browse" prepend-icon="mdi-magnify">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Browse</span>
              </template>
            </v-list-item>
            <v-list-item to="/signup" prepend-icon="mdi-account-arrow-right">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Sign up</span>
              </template>
            </v-list-item>
            <v-list-item to="/login" prepend-icon="mdi-login">
              <template v-slot:title>
                <span class="text-h6 cursor-pointer">Log in</span>
              </template>
            </v-list-item>
          </v-list>
        </template>
        <v-spacer></v-spacer>
        <template #append>
          <v-list v-if="showFooter">
            <v-list-item prepend-icon="mdi-help-circle">
              <template v-slot:title>
                <span class="text-body-title-1 cursor-pointer"
                  >Help & Support</span
                >
              </template>
            </v-list-item>
            <v-list-item>
              <hr />
              <div class="text-caption py-5 text-no-wrap">
                <h3>
                  Copyright &copy; {{ new Date().getFullYear() }} -
                  <strong>Djob</strong>
                </h3>
              </div>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>
      <v-main app>
        <slot />
      </v-main>
    </v-app>
  </div>
</template>
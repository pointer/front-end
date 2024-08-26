<script setup>
// require("dotenv").config()Uncaught Error: Module "module" has been externalized for browser compatibility.;
// import config from dotenv;
// console.log(process.env); // remove this after you've confirmed it is working
import {
  ref,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  reactive,
  computed,
  watch,
} from "vue";
import { RouterLink, RouterView } from "vue-router";
// import { Nav, Alert } from "@/components";
import { useAuthStore } from "@/store";

const authStore = useAuthStore();

import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import vuetify from "./plugins/vuetify";
const drawer = ref(false);
const group = ref(null);
const windowWidth = ref(window.innerWidth);
const router = useRouter();
const permanent = computed(() => {
  return display.lgAndUp.value;
});
const showOverlay = computed(() => drawer.value && !permanent.value);
const display = useDisplay();

const toggleDrawer = () => {
  const user = localStorage.getItem("user");
  if (user.includes("admin")) drawer.value = !drawer.value;
};
const closeDrawer = () => {
  drawer.value = false;
};
const items = ref([
  { title: "Home", value: "home", route: "/" },
  { title: "User Registrar", value: "user-data", route: "/user-data" },
  { title: "Time Sheet", value: "bar", route: "/time-sheet" },
  { title: "Validation", value: "approbation", route: "/approbation" },
  { title: "Admin", value: "buzz", route: "/admin" },
]);
// const permanent = computed(() => {
//   return windowWidth.value >= 1264; // Equivalent to Vuetify's 'lg' breakpoint
// });

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

const handleOutsideClick = (event) => {
  if (drawer.value && !permanent.value) {
    const navDrawer = document.querySelector(".v-navigation-drawer");
    const appBar = document.querySelector(".v-app-bar");
    if (
      navDrawer &&
      !navDrawer.contains(event.target) &&
      !appBar.contains(event.target)
    ) {
      drawer.value = false;
    }
  }
};

function checkAuth(to, from, next) {
  if (IsAuthenticated()) next();
  else next("/login");
}

function guardMyroute(to, from, next) {
  let isAuthenticated = false;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (localStorage.getItem("user"))
    //('LoggedUser'))
    isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login"); // go to '/login';
  }
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
  document.addEventListener("click", handleOutsideClick);
  // window.process = {
  //   env: {
  //     NODE_ENV: "development",
  //   },
  // };
  const role = JSON.parse(localStorage.getItem("role"));
  if (role) {
    if (role === 1) {
      router.push("/approbation");
    } else if (role === 0) {
      router.push("/employee");
    } else {
      router.push("/");
    }
  } else {
    router.push("/account/userLogin");
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  document.removeEventListener("click", handleOutsideClick);
});
watch(group, () => {
  drawer.value = false;
});
</script>

<template>
  <v-app>
    <v-app-bar color="primary" app elevation="4" :height="64" density="compact">
      <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <h2>Randstadt Report Effort</h2>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app theme="dark" :clipped="false" width="200" :style="{ top: '64px' }"
      temporary>
      <v-list>
        <router-link v-for="item in items" :key="item.value" :to="item.route" custom v-slot="{ navigate, isActive }">
          <v-list-item :active="isActive" @click="navigate">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- <template> -->
    <div class="app-container" :class="authStore.user && 'bg-light'">
      <!-- <Nav />
      <Alert /> -->
      <div class="container pt-4 pb-4">
        <router-view />
      </div>
    </div>
    <!-- </template> -->

    <v-main>
      <!-- <router-view></router-view> -->
    </v-main>
  </v-app>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  margin-bottom: auto;
  /* margin-bottom: 1rem; */
}

nav a {
  text-decoration: none;
  color: #42b883;
}

nav a:hover {
  color: #38a169;
}

.v-main {
  background-image: url("");
  background-size: cover;
  background-position: center;
  background-color: #121212;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5;
}

.app-container {
  min-height: 350px;
}

.btn-delete-user {
  width: 40px;
  text-align: center;
  box-sizing: content-box;
}
</style>

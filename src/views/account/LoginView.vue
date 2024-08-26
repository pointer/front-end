<template>
  <div>
    <!-- <v-img class="mx-auto my-6" max-width="228"
      src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img> -->

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field v-model="username" density="compact" placeholder="Email address"
        prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          Forgot login password?</a>
      </div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible"></v-text-field>

      <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If
          you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" @click="onSignIn" block>
        Log In
      </v-btn>

      <v-card-text class="text-center" @click.native='onSignUp'>
        <a class="text-blue text-decoration-none" rel="noopener noreferrer" target="_blank">
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NavigationFailureType, isNavigationFailure } from "vue-router";
// import AdminAgents from '@/views/AdminAgents.vue';
// import CryptoJS from 'crypto-js';
// import sha256 from 'crypto-js/sha256';
// import { Form, Field } from "vee-validate";
import { useField, useForm, ErrorMessage } from "vee-validate";
// import * as Yup from "yup";
// import * as adminUser from "@/AdminUsers"
import { useAuthStore } from "@/store";
const visible = ref(false);
const form = ref(false);
const loading = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
const passwordRules = [
  (value) => !!value || "Required.",
  (value) => (value && value.length >= 8) || "Min 8 characters",
];

const emailRules = [
  (v) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "E-mail must be valid",
];

// const schema = Yup.object().shape({
//   username: Yup.string().required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// const { handleSubmit, handleReset } = useForm({
//   schema,
// });

async function onSignIn() {
  const authStore = useAuthStore();
  const payload = new URLSearchParams();
  payload.append('username', username.value);  // or 'email', depending on what your backend expects
  payload.append('password', password.value);
  const response = await authStore.userLogin(payload);
  loading.value = true;
  let page = "";
  // console.log(response);
  // if (response.status === 200) {
  const role = localStorage.getItem("role")
  if (role == 1){
  router.push({ name: 'Approbation' });
  } 
  else{ // if (role === 0) {
  router.push({ name: 'TimeSheet' });
  }
//  } else {
//     alert("Login failed");
//   }
  loading.value = false;
}

async function onSignUp() {
  const authStore = useAuthStore();
  try {
    router.push({ name: 'UserData' });
  } catch (error) {
    console.error('Registration error:', error);
  }
}

// async function onSignUp() {
//   const authStore = useAuthStore();
//   try {
//     const payload = {
//       email: username.value,
//       password: password.value
//     };
//     const response = await authStore.userRegister(payload);
//     if (response.status === 200) {
//       alert("Registration successful. Please log in.");
//     } else {
//       alert("Registration failed: " + response.data.detail);
//     }
//   } catch (error) {
//     console.error('Registration error:', error);
//     if (error.response && error.response.data) {
//       alert("Registration failed: " + error.response.data.detail);
//     } else {
//       alert("Registration failed: An unexpected error occurred");
//     }
//   }


// const username = useField('username', validationSchema);
// const password = useField('password', validationSchema);

// const onSubmit = handleSubmit(async (values) => {
//   alert(JSON.stringify(values, null, 2));
// });

async function login() {
  loading.value = true;
  // const hashedPassword = CryptoJS.SHA256(password.value).toString();
  const response = await fakeLoginApi(username.value, password.value);
  loading.value = false;
  let page = "";
  // console.log(response);
  if (response.success) {
    // localStorage.setItem("user", JSON.stringify(response.user));
    // localStorage.setItem("working_days", JSON.stringify(response.working_days));

    // trying to leave the editing page of an article without saving
    if (response.user.role === "Supervisor") {
      page = "/supervisor";
    } else if (response.user.role === "Employee") {
      page = "/time-sheet";
    } else if (response.user.role === "Admin") {
      page = "/";
    }
    // console.log(page);
    if (router.currentRoute.value.path !== page) {
      const failure = await router.push(page);
      // console.log(failure);
      if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
        // show a small notification to the user
        showToast("You have unsaved changes, discard and leave anyway?");
      }
    }
  } else {
    alert("Login failed");
  }
}

async function fakeLoginApi(user_name, password) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("ws://localhost:8765");

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: "login", user_name, password }));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      resolve(response);
      ws.close();
    };

    ws.onerror = (error) => {
      reject(error);
    };
  });
}
</script>
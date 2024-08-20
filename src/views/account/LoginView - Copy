<template>
  <v-sheet class="bg-deep-purple pa-12" rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
      <v-form v-model="form" :validation-schema="schema">
        <!-- <v-form v-model="form" @submit.prevent="onSubmit" :validation-schema="schema"> -->
        <v-text-field v-model="username" :readonly="loading" class="mb-2" label="username" clearable
          placeholder="Enter your username"></v-text-field>
        <ErrorMessage name="username" />
        <v-text-field v-model="password" :readonly="loading" type="password" label="Password"
          placeholder="Enter your password" clearable></v-text-field>
        <ErrorMessage name="password" />
        <!-- <v-otp-input
          :error-messages="codeErrorMsg"
          v-model="password"
          type="password"
          length="5"
          dark
        ></v-otp-input> -->
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-row>
          <v-col>
            <v-btn :disabled="!form" :loading="loading" color="success" size="large" @click="onSignIn"
              variant="elevated" block>
              Sign In
            </v-btn>
          </v-col>
          <v-col>
            <v-btn :disabled="!form" :loading="loading" color="success" size="large" @click="onSignUp"
              variant="elevated" block>
              Sign Up
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NavigationFailureType, isNavigationFailure } from "vue-router";
import AdminAgents from '@/views/AdminAgents.vue';
// import CryptoJS from 'crypto-js';
// import sha256 from 'crypto-js/sha256';
import { Form, Field } from "vee-validate";
import { useField, useForm, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
// import * as adminUser from "@/AdminUsers"
import { useAuthStore } from "@/store";

const schema = Yup.object().shape({
  username: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const { handleSubmit, handleReset } = useForm({
  schema,
});

async function onSignIn() {
  const authStore = useAuthStore();
  // const { username, password } = values;
  // const username = useField("username", schema);
  // const password = useField("password", schema);
  // username.value, password.va
  const payload = new URLSearchParams();
  payload.append('username', username.value);  // or 'email', depending on what your backend expects
  payload.append('password', password.value);
  await authStore.userLogin(payload);
  // await authStore.userLogin(email.value, password.value);
}

async function onSignUp() {
  const authStore = useAuthStore();
  try {
    // const payload = {
    //   email: username.value,
    //   password: password.value
    // };
    // const response = await authStore.userRegister(payload);
    router.push({ name: 'UserData' });
    // if (response.status === 200) {
    //   alert("Registration successful. Please log in.");
    // } else {
    //   alert("Registration failed: " + response.data.detail);
    // }
  } catch (error) {
    console.error('Registration error:', error);
    // if (error.response && error.response.data) {
    //   alert("Registration failed: " + error.response.data.detail);
    // } else {
    //   alert("Registration failed: An unexpected error occurred");
    // }
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

async function login() {
  loading.value = true;
  // const hashedPassword = CryptoJS.SHA256(password.value).toString();
  const response = await fakeLoginApi(username.value, password.value);
  loading.value = false;
  let page = "";
  // console.log(response);
  if (response.success) {
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("working_days", JSON.stringify(response.working_days));

    // trying to leave the editing page of an article without saving
    // if (response.user.role === "Supervisor") {
    //   page = "/supervisor";
    // } else if (response.user.role === "Employee") {
    //   page = "/time-sheet";
    // } else if (response.user.role === "Admin") {
    //   page = "/";
    // }
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
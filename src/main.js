import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { createI18n } from "vue-i18n";
import i18n from "./plugins/i18n";
import Vuelidate from "vuelidate";

import dotenv from "dotenv";
import axios from "axios";
import VueAxios from "vue-axios";
// dotenv.config({ path: "../.env" });
// console.log(process.env); // remove this after you've confirmed it is working
// console.log(import.meta.env.VITE_SRV_APP_API_URL); // "123"
// console.log(import.meta.env.VITE_APP_API_URL); // undefined
// console.log(process.env.NODE_ENV, process.env.PORT);
// import "./addRequire.js";
// app.use(createPinia());
// const app = createApp(App).use(VueAxios, axios).use(createPinia()).use(router).use(vuetify).mount("#app");
// // app.use(VueAxios, axios)
// app.config.globalProperties.axios = axios;

const app = createApp(App);
app
  .use(VueAxios, axios)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .use(Vuelidate)
  .use(vuetify);

app.config.globalProperties.axios = axios;

app.mount("#app");

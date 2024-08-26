import axios from "axios";
import https from "https";
// const VITE_SRV_API_URL =
//     process.env.NODE_ENV === 'development'
//         ? 'https://cra-backend-a041b1ab5b0c.herokuapp.com/'
//         : '/admin-app/admin/api';
axios.defaults.baseURL = "https://cra-backend-a041b1ab5b0c.herokuapp.com/";
//   `${
//   import.meta.env.SRV_API_URL
// }` || "";
axios.defaults.headers.common["Accept-Language"] =
  JSON.parse(localStorage.getItem("locale")) || "en";

const SRV_API_URL = `${import.meta.env.VITE_SRV_API_URL}`;
const instance = axios.create({
  baseURL : "https://cra-backend-a041b1ab5b0c.herokuapp.com/",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
  }),
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response.data;
  },
  (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = err.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        return Promise.reject(new APIError(err.message, 409));
      }

      // forbidden (permission related issues)
      case 403: {
        return Promise.reject(new APIError(err.message, 409));
      }

      // bad request
      case 400: {
        return Promise.reject(new APIError(err.message, 400));
      }

      // not found
      case 404: {
        return Promise.reject(new APIError(err.message, 404));
      }

      // conflict
      case 409: {
        return Promise.reject(new APIError(err.message, 409));
      }

      // unprocessable
      case 422: {
        return Promise.reject(new APIError(err.message, 422));
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(new APIError(err.message, 500));
      }
    }
  }
);

// response => {
//     return response;
// },
// error => {
//     let originalRequest = error.config;
//     let refreshToken = localStorage.getItem('refreshToken');
//     const username = EmailDecoder(); // decode email from jwt token subject
//     if (
//         refreshToken &&
//         error.response.status === 403 &&
//         !originalRequest._retry &&
//         username
//     ) {
//         originalRequest._retry = true;
//         return axios
//             .post(`${API_URL}/authentication/refresh`, {
//                 refreshToken: refreshToken,
//                 username,
//             })
//             .then(res => {
//                 if (res.status === 200) {
//                     localStorage.setItem(
//                         'accessToken',
//                         res.data.accessToken
//                     );
//                     localStorage.setItem(
//                         'refreshToken',
//                         res.data.refreshToken
//                     );

//                     originalRequest.headers[
//                         'Authorization'
//                     ] = `Bearer ${res.data.accessToken}`;

//                     return axios(originalRequest);
//                 }
//             })
//             .catch(() => {
//                 localStorage.clear();
//                 location.reload();
//             });
//     }
//     return Promise.reject(error.response || error.message);
// }
// );

export default instance;

// import Vue from 'vue'
// import axios from 'axios'
// import { checkIfTokenNeedsRefresh } from '@/utils/utils.js'
// import { checkForUpdates } from '@/utils/updates.js'

// axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000'
// axios.defaults.headers.common['Accept-Language'] =
//   JSON.parse(localStorage.getItem('locale')) || 'en'

// axios.interceptors.request.use(
//   (config) => {
//     // Do something before request is sent
//     // If request is different than any of the URLS in urlsExcludedForBearerHeader
//     // then send Authorization header with token from localstorage
//     const urlsExcludedForBearerHeader = [
//       '/login',
//       '/forgot',
//       '/register',
//       '/reset',
//       `${window.location.origin}/version.json`
//     ]
//     if (urlsExcludedForBearerHeader.indexOf(config.url) === -1) {
//       config.headers.Authorization = `Bearer ${JSON.parse(
//         localStorage.getItem('token')
//       )}`
//     }
//     return config
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error)
//   }
// )

// // Add a response interceptor
// axios.interceptors.response.use(
//   (response) => {
//     // Do something with response data
//     // Checks if app is being used in mobile
//     if (
//       response.config.url !== `${process.env.VUE_APP_API_URL}/token` &&
//       response.config.url !== `${window.location.origin}/version.json`
//     ) {
//       checkForUpdates()
//       checkIfTokenNeedsRefresh()
//     }
//     return response
//   },
//   (error) => {
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )

// // eslint-disable-next-line no-shadow
// Plugin.install = (Vue) => {
//   Vue.axios = axios
//   window.axios = axios
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return axios
//       }
//     },
//     $axios: {
//       get() {
//         return axios
//       }
//     }
//   })
// }

// Vue.use(Plugin)

// export default Plugin

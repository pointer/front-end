import { defineStore } from "pinia";
import { isPast, format, parseISO, addMinutes } from "date-fns";
import * as types from '@/store/mutation-types'
import router from '@/router'
import api from '@/services/api/auth'
import { buildSuccess, handleError } from '@/utils/utils.js'
// import { fetchWrapper } from "@/helpers";
// import { router } from "@/router";
import { useAlertStore } from "@/store";

const MINUTES_TO_CHECK_FOR_TOKEN_REFRESH = 1440

// const baseUrl = `${import.meta.env.VITE_SRV_API_URL}`;

// async function localLogin(username, password) {
//   return new Promise((resolve, reject) => {
//     const ws = new WebSocket(baseUrl);
//     // const ws = new WebSocket("ws://localhost:8765");
//     ws.onopen = () => {
//       ws.send(JSON.stringify({ action: "login", username, password }));
//     };

//     ws.onmessage = (event) => {
//       const response = JSON.parse(event.data);
//       resolve(response);
//       ws.close();
//     };

//     ws.onerror = (error) => {
//       reject(error);
//     };
//   });
// }
export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem('token')) || null,
    isTokenSet: !!localStorage.getItem('token'),
    working_days: JSON.parse(localStorage.getItem('working_days')),
    returnUrl: null,
  }),

  // getters: {
  //   user: (state) => state.user,
  //   token: (state) => state.token,
  //   isTokenSet: (state) => state.isTokenSet
  // },

  actions: {
    userLogin(payload) {
      return new Promise((resolve, reject) => {
        // this.SHOW_LOADING(true);
        api
          .userLogin(payload)
          .then((response) => {
            if (response.status === 200) {
              localStorage.setItem('user', JSON.stringify(response.data.user));
              localStorage.setItem('user_id', JSON.stringify(response.data.id));              
              localStorage.setItem('token', JSON.stringify(response.data.access_token));
              localStorage.setItem('token_type', JSON.stringify(response.data.token_type));
              localStorage.setItem('role', JSON.stringify(response.data.role));
              localStorage.setItem('working_days', JSON.stringify(response.data.working_days));
              localStorage.setItem(
                'tokenExpiration',
                JSON.stringify(
                  format(
                    addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                    'X'
                  )
                )
              );
              this.user = response.data.user;
              this.token = response.data.token;
              this.isTokenSet = true;
              this.working_days = response.data.working_days;
              this.user_id = response.data.id;
              this.token_type = response.data.token_type;
              this.role = response.data.role;
              if (response.data.role === true) {
                router.push({ name: 'Approbation' })
              } else {
                router.push({ name: 'TimeSheet' })
              }
              buildSuccess(
                null,
                this,
                resolve,
              );              
            }
            else {
              const errorData = response.json();
              if (errorData.message === 'REGISTER_USER_ALREADY_EXISTS') {
                console.error('This email is already registered');
              // Handle this case in your UI, maybe show an error message to the user
              } else 
                console.error('Registration failed:', errorData.message);
              // Handle other types of errors
              } 
          })
      });
    },
    refreshToken({ commit }) {
      return new Promise((resolve, reject) => {
        api
          .refreshToken()
          .then((response) => {
            if (response.status === 200) {
              window.localStorage.setItem(
                'token',
                JSON.stringify(response.data.token)
              )
              window.localStorage.setItem(
                'tokenExpiration',
                JSON.stringify(
                  format(
                    addMinutes(new Date(), MINUTES_TO_CHECK_FOR_TOKEN_REFRESH),
                    'X'
                  )
                )
              )
              commit(types.SAVE_TOKEN, response.data.token)
              resolve()
            }
          })
          .catch((error) => {
            handleError(error, commit, reject)
          })
      })
    },
    autoLogin({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'))
      const user_id = JSON.parse(localStorage.getItem('user_id'))
      const token_type = JSON.parse(localStorage.getItem('token_type'))
      const role = JSON.parse(localStorage.getItem('role'))
      const working_days = JSON.parse(localStorage.getItem('working_days'))
    },
    userLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiration')
      localStorage.removeItem('user')
      localStorage.removeItem('user_id')
      localStorage.removeItem('token_type')
      localStorage.removeItem('role')
      localStorage.removeItem('working_days')
      // commit(types.LOGOUT)
      router.push({
        name: 'Home'
      })
    },
    userRegister(payload) {
      return new Promise((resolve, reject) => {
        api
          .userRegister(payload)
          .then((response) => {
            if (response.status === 200) {
              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },

  mutations: {
    [types.SAVE_TOKEN](state, token) {
      state.token = token;
      state.isTokenSet = true;
    },
    [types.LOGOUT](state) {
      state.user = null;
      state.token = null;
      state.isTokenSet = false;
      state.working_days = null;
      localStorage.removeItem('working_days');
    },
    [types.SAVE_USER](state, user) {
      state.user = user;
    }
  }
});
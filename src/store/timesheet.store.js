import { defineStore } from "pinia";
import { isPast, format, parseISO, addMinutes } from "date-fns";
import * as types from "@/store/mutation-types";
import router from "@/router";
import api from "@/services/api/user-time-sheet";
import { buildSuccess, handleError } from "@/utils/utils.js";

const getters = {
  timesheets: (state) => state.timesheets,
  totalTtimesheets: (state) => state.totalTimesheets,
};

export const useTimesheetStore = defineStore({
  id: "user-timesheet",
  // getters: {
  // user: (state) => state.user,
  // token: (state) => state.token,
  // isTokenSet: (state) => state.isTokenSet
  // },

  actions: {
    getTimesheets({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // this.SHOW_LOADING(true);
        api.getTimesheets(payload).then((response) => {
          if (response.status === 200) {
            const timesheetArray = [];
            response.data.docs.forEach((element) => {
              timesheetArray.push(element);
            });
            // console.log('agents :  ', userArray)
            this.TIME_SHEETS = timesheetArray;
            this.TOTAL_TIME_SHEETS = response.data.totalDocs;
            buildSuccess(
              null,
              this,
              resolve,
              router.push({ name: "TimeSheet" }).catch((error) => {
                console.error("Navigation failed:", error);
                // Optionally, you can redirect to a default route or show an error message
              })
            );
          } else {
            const errorData = response.json();
            if (errorData.message === "") {
              console.error("");
              // Handle this case in your UI, maybe show an error message to the user
            } else console.error("Timesheet failed:", errorData.message);
            // Handle other types of errors
          }
        });
      });
    },
    editTimesheet({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const data = {
          id: payload.user_id,
          date: payload.date,
          worked: payload.worked,
          working: payload.working,
        };
        api
          .editTimesheet(payload._id, data)
          .then((response) => {
            if (response.status === 200) {
              resolve();
              buildSuccess(
                {
                  msg: "common.SAVED_SUCCESSFULLY",
                },
                commit,
                resolve
              );
              resolve();
            }
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
    saveTimesheet( payload) {
          console.log(payload)
      return new Promise((resolve, reject) => {
        api
          .saveTimesheet(payload)
          .then((response) => {
            if (response.status === 200) {
              buildSuccess(
                {
                  msg: "common.SAVED_SUCCESSFULLY",
                },
                '',
                resolve
              );
              resolve();
            }
          })
          .catch((error) => {
            console.log('error : ', error)
            // handleError(error, commit, reject);
          });
      });
    },
    deleteTimesheet(id) {
      return new Promise((resolve, reject) => {
        api
          .deleteTimesheet(id)
          .then((response) => {
            if (response.status === 200) {
              buildSuccess(
                {
                  msg: "common.DELETED_SUCCESSFULLY",
                },
                commit,
                resolve
              );
              resolve();
            }
          })
          .catch((error) => {
            handleError(error, commit, reject);
          });
      });
    },
  },

  // mutations: {
  //   [types.SAVE_TOKEN](state, token) {
  //     state.token = token;
  //     state.isTokenSet = true;
  //   },
  //   [types.LOGOUT](state) {
  //     state.user = null;
  //     state.token = null;
  //     state.isTokenSet = false;
  //   },
  //   [types.SAVE_USER](state, user) {
  //     state.user = user;
  //   },
  // },
});

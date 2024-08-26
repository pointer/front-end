import { defineStore } from 'pinia';
import { isPast, format, parseISO, addMinutes } from "date-fns";
import * as types from "@/store/mutation-types";
import router from "@/router";
import api from "@/services/api/approbation";
import timesheet_api from "@/services/api/user-time-sheet";
import { buildSuccess, handleError } from "@/utils/utils.js";


export const useApprobationStore = defineStore({
    id: 'approbation',
    state: () => ({
        approbation: null
    }),
    actions: {
        getApprobations({ month, token }) {
            return new Promise((resolve, reject) => {
                api.getApprobationsByMonth(month, token)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log(response.data);
                            this.approbation = response.data;
                            resolve(response.data);                            
                        } else {
                            reject(response.data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        editApprobation(id, payload) {
            return api.editApprobation(id, payload);
        },
        saveApprobation(token, payload) {
            return api.saveApprobation(token,payload);
        },
        saveApprobations(payload) {
            return api.saveApprobations(payload);
            // return new Promise((resolve, reject) => {
            //     api.saveApprobations(payload)
            //         .then((response) => {
            //             // console.log(JSON.stringify(response))
            //             if (response.status === 200) {
            //                 console.log(response)
            //                 resolve(response.data);
            //             } else {
            //                 reject(response.data);
            //             }
            //         })
            //         .catch((error) => {
            //             reject(error);
            //         });
            // });            
        },
        deleteApprobation(id) {
            return api.deleteApprobation(id);
        },
        getTimesheetsByMonth(month, approver, token) {
            return new Promise((resolve, reject) => {
                api.getTimesheetsByMonth(month, approver, token)
                    .then((response) => {
                        if (response.status === 200) {
                            // console.log(response.data)
                            resolve(response.data);
                        } else {
                            reject(response.data);
                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    }
});
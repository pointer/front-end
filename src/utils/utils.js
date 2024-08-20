import i18n from '@/plugins/i18n'
import * as types from "@/store/mutation-types";
import { isPast, format, parseISO } from "date-fns";
import * as store from "@/store";
import { es, zhCN } from "date-fns/locale";

const localesDateFns = {
  es,
  cn: zhCN,
};

export const getFormat = (date, formatStr) => {
  return format(parseISO(date), formatStr, {
    locale: localesDateFns[window.__localeId__],
  });
};

export const formatErrorMessages = (translationParent, msg) => {
  const errorArray = [];
  // Check for error msgs
  if (msg !== null) {
    const json = JSON.parse(JSON.stringify(msg));
    // If error message is an array, then we have mutiple errors
    if (Array.isArray(json)) {
      json.map((error) => {
        errorArray.push(i18n.t(`${translationParent}.${error.msg}`));
      });
    } else {
      // Single error
      errorArray.push(i18n.t(`${translationParent}.${msg}`));
    }
    return errorArray;
  }
  // all good, return null
  return null;
};

export const buildPayloadPagination = (pagination, search) => {
  // const { sortBy, page, rowsPerPage } = pagination
  // const rowsPerPage = pagination.itemsPerPage;
  // const page = pagination.page;
  // const sortBy = pagination.sortBy;
  // // console.log('pagination 0 : ', pagination)
  // let { descending } = pagination;
  // // Gets order
  // descending = descending ? -1 : 1;

  let query = {};

  // If search and fields are defined
  // if (search) {
  //   query = {
  //     sort: pagination.sortBy,
  //     order: descending,
  //     page: pagination.page,
  //     limit: pagination.itemsPerPage,
  //     filter: search.query,
  //     fields: search.fields,
  //   };
  // } else {
  //   // Pagination with no filters
  //   query = {
  //     sort: pagination.sortBy,
  //     order: descending,
  //     page: pagination.page,
  //     limit: pagination.itemsPerPage,
  //   };
  // }
  // console.log('query:', query)
  return query;
};

// Catches error connection or any other error (checks if error.response exists)
export const handleError = (error, store, reject) => {
  let errMsg = "";
  // if (store.$state.showLoading !== undefined) {
  //   store.$patch({ showLoading: false });
  // }
  // if (store.$state.error !== undefined) {
  //   store.$patch({ error: null });
  // }
  // if (error.response && error.response.status === 401) {
  //   store.userLogout();
  // } else {
  //   errMsg = error.response
  //     ? error.response.data.errors.msg
  //     : "SERVER_TIMEOUT_CONNECTION_ERROR";
  //   setTimeout(() => {
  //     if (store.$state.error !== undefined) {
  //       store.$patch({ error: errMsg || false });
  //     }
  //   }, 0);
  // }
  reject(error);
};

export const buildSuccess = (
  msg,
  store,
  resolve,
  resolveParam = undefined
) => {
  if (store.$state.showLoading !== undefined) {
    store.$patch({ showLoading: false });
  }
  if (store.$state.success !== undefined) {
    store.$patch({ success: null });
  }
  setTimeout(() => {
    if (store.$state.success !== undefined) {
      store.$patch({ success: msg || false });
    }
  }, 0);
  if (store.$state.error !== undefined) {
    store.$patch({ error: null });
  }
  resolve(resolveParam);
};

// Checks if tokenExpiration in localstorage date is past, if so then trigger an update
export const checkIfTokenNeedsRefresh = () => {
  // Checks if time set in localstorage is past to check for refresh token
  if (
    window.localStorage.getItem("token") !== null &&
    window.localStorage.getItem("tokenExpiration") !== null
  ) {
    if (
      isPast(
        new Date(
          parseISO(JSON.parse(window.localStorage.getItem("tokenExpiration"))) *
            1000
        )
      )
    ) {
      store.dispatch("refreshToken");
    }
  }
};
// To convert Unix timestamps according to our convenience
export const unixToHuman = (timezone, timestamp) => {
  /* READ THIS BEFORE JUDGING & DEBUGGING
    For any location beyond the arctic circle and the
    antarctic circle, the goddamn weather api does not return certain
    keys/values in each of this.rawWeatherData.daily.data[some_array_index].
    Due to this, console throws up an error.
    The code is correct, the problem is with the API.
    May be later on I will add some padding to tackle missing values.
    */
  const moment = require("moment-timezone"); // for handling date & time
  const decipher = new Date(timestamp * 1000);
  const human = moment(decipher).tz(timezone).format("llll");
  const timeArray = human.split(" ");
  const timeNumeral = timeArray[4];
  const timeSuffix = timeArray[5];
  const justTime = `${timeNumeral} ${timeSuffix}`;
  const monthDateArray = human.split(",");
  const monthDate = monthDateArray[1].trim();
  return {
    fullTime: human,
    onlyTime: justTime,
    onlyMonthDate: monthDate,
  };
};

export const getCoordinates = () => {
  // this.locationEntered()
  // const loc = this.location
  // let coords
  // const geocoder = new google.maps.Geocoder()
  // return new Promise((resolve, reject) => {
  //   geocoder.geocode(
  //     {
  //       address: loc
  //     },
  //     function(results, status) {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         this.lat = results[0].geometry.location.lat()
  //         this.long = results[0].geometry.location.lng()
  //         this.full_location = results[0].formatted_address
  //         coords = {
  //           lat: this.lat,
  //           long: this.long,
  //           full_location: this.full_location
  //         }
  //         resolve(coords)
  //       } else {
  //         alert('Oops! Couldn\'t get data for the location')
  //       }
  //     }
  //   )
  // })
};

export function isWeekend(date) {
  const day = new Date(date).getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

export function isHoliday(date) {
  const holidays = [
    '2023-12-25', // Christmas
    '2023-01-01', // New Year's Day
    // Add more holidays here
  ];
  return holidays.includes(date.toISOString().substring(0, 10));
}
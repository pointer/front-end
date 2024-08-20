import axios from "axios";

const baseUrl = 'https://cra-backend-a041b1ab5b0c.herokuapp.com'
//`${import.meta.env.VITE_SRV_API_URL}`;
export default {
  getTimesheetsByMonth(month, approver, token) {
    return axios
      .get(`${baseUrl}/api/approbations/${month}/${approver}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
        },
      })
      .catch((error) => {
        console.error(
          "Error in Get Timesheets:",
          error.response ? error.response.data : error
        );
        throw error;
      });
  },

  getApprobations(params) {
    const token = localStorage.getItem("token")?.replace(/"/g, "");
    return axios
      .get(`${baseUrl}/api/approbations`, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error(
          "Error in Get Approbations:",
          error.response ? error.response.data : error
        );
        throw error;
      });
  },
  editApprobation(id, payload) {
    return axios.patch(`${baseUrl}/approbation/${id}`, payload);
  },

  saveApprobation(token, payload) {
    // console.log(payload)
    return axios
      .post(`${import.meta.env.VITE_SRV_API_URL}/api/approbation`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
        },
      })
      .catch((error) => {
        console.error(
          "Error in saveApprobation:",
          error.response ? error.response.data : error
        );
        throw error;
      });
  },
  saveApprobations(payload) {
    console.log(payload);
    return axios
      .post(`${import.meta.env.VITE_SRV_API_URL}/api/approbations`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error(
          "Error in saveApprobations:",
          error.response ? error.response.data : error
        );
        throw error;
      });
  },
  deleteApprobation(id) {
    return axios.delete(`${baseUrl}/approbation/${id}`);
  },
};

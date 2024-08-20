import axios from 'axios'

const baseUrl = 'https://cra-backend-a041b1ab5b0c.herokuapp.com'
//`${import.meta.env.VITE_SRV_API_URL}`;

export default {
  getTimesheets(month, token) {
      return axios.get(`${baseUrl}/api/approbations/${month}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.replace(/"/g, '')}`
          }
      }).catch(error => {
          console.error('Error in Get Timesheets:', error.response ? error.response.data : error);
          throw error;
      });
  },  
  getTimesheets(token){
    return axios.get(`${baseUrl}/api/timesheets`, {
      params: { month },
      headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token.replace(/"/g, '')}`
        }
    }).catch(error => {
        console.error('Error in Get Timesheets:', error.response ? error.response.data : error);
        throw error;
    });
  },
  editTimesheet(id, payload) {
    return axios.patch(`${baseUrl}/timesheet/${id}`, payload)
  },

saveTimesheet(payload) {
  console.log('Payload:', payload);
  const token = localStorage.getItem('token')?.replace(/"/g, '');
  return axios.post(`${baseUrl}/api/timesheet`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).catch(error => {
    console.error('Error in saveTimesheet:', error.response ? error.response.data : error);
    throw error;
  });
},
  deleteTimesheet(id) {
    return axios.delete(`${baseUrl}/timesheet/${id}`)
  }
}
import axios from "axios";
// console.log(axios)

const baseUrl = 'https://cra-backend-a041b1ab5b0c.herokuapp.com'
//`${import.meta.env.VITE_SRV_API_URL}`;

export default {
  userLogin(payload) {
    const formData = new URLSearchParams();
    formData.append("username", payload.email); // Use 'username' if that's what the backend expects
    formData.append("password", payload.password);
    // console.log(baseUrl)
    return axios.post(
      `${baseUrl}/auth/jwt/login`,
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  },
  // userLogin(payload) {
  //   return axios.post(`${import.meta.env.VITE_SRV_API_URL}/auth/jwt/login`, payload)
  // },
  refreshToken() {
    return axios.get("/token");
  },
  // userRegister(payload) {
  //   try {
  //     // for (const p of payload) {
  //     //   console.log(p);
  //     // }
  //     console.log(payload.toString());
  //     return axios.post(`${import.meta.env.VITE_SRV_API_URL}/auth/register`, payload)
  //     // return axios.post('http://localhost:8000/auth/register',
  //     //   {
  //     //     email: 'king.arthur@camelot.bt',
  //     //     password: 'guinevere',
  //     //   })

  //   } catch (error) {
  //     ;
  //   }
  // },

  userRegister(payload) {
    return axios.post(
      `${baseUrl}/auth/register`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  userLogout() {},
};

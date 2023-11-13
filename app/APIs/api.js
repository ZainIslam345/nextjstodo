import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API server URL
  withCredentials: false,
  // Disable SSL certificate verification for local development
});

api.interceptors.request.use(
  (config) => {
      config.withCredentials = false;
      const userData = JSON.parse(localStorage.getItem('user'));
      const token = userData ? userData.token : null;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);


export default api;

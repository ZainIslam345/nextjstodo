import axios from "axios";


const api = axios.create({
  // baseURL: "http://localhost:5000/api", // Replace with your API server URL
  // baseURL: "https://backend-myjrvy5uw-zains-projects-78f036c4.vercel.app/api", // Replace with your API server URL
  // baseURL: "https://experssbackend-cichcoi9r-zains-projects-78f036c4.vercel.app/api", // Replace with your API server URL
  baseURL: "https://backend1-five.vercel.app/api", // Replace with your API server URL
  withCredentials: true,
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

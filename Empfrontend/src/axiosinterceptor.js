import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://employee-backend-4frt.onrender.com'||'http://localhost:3000', // Or your Render API URL in production
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = sessionStorage.getItem('token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

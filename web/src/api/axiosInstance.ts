import axios from 'axios';

const baseURL = 'http://localhost:3000';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// interceptors can be added to attach tokens to requests or handle errors globally

export default axiosInstance;
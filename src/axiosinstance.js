import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://auth-v2-forrendering.onrender.com/api/v1/user',
});

export { axiosInstance };

import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
// import {store} from "../index";
// import {IUser} from "../models/IUser";

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

$api.interceptors.response.use((response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}/refresh`,
          {withCredentials: true},
        );
        localStorage.setItem('token', response.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  }
);

export default $api;

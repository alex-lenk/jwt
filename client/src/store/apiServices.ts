import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

export const signIn = (userCredentials: object) => {
  return axios.post(`${API_URL}signin`, userCredentials);
};

export const signUp = (userCredentials: object) => {
  return axios.post(`${API_URL}signup`, userCredentials);
};

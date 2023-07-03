import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/v1',
});

export const registerUser = async (userCredentials: object) => {
  const response = await api.post('/auth/register', userCredentials);
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const getUserInfo = async (token: string) => {
  const response = await api.get('/user', {
    headers: { Authorization: `Bearer ${ token }` },
  });
  return response.data;
};

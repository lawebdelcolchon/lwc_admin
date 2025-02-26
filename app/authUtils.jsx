// src/app/authUtils.js
import axios from 'axios';

export const saveAuthToken = (token) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['authorization'] = `${token}`;
};

export const removeAuthToken = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['authorization'];
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

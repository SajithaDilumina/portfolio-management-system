import axios from 'axios';
import { exceptionHandler } from '../core';

axios.defaults.baseURL = "http://localhost:5000";

export const axiosPublicInstance = axios.create();
export const axiosPrivateInstance = axios.create();

// Request interceptor to manage authorization & headers
axiosPrivateInstance.interceptors.request.use(async (request) => {
  const tokenResponse = { accessToken: "token" };
  request.headers.Authorization = `Bearer ${tokenResponse?.accessToken}`;

  return request;
}, (error) => {
  console.log('Req interceptor Error', error);
});

// Response interceptor to manage responses & errors
axiosPrivateInstance.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  return Promise.reject(await exceptionHandler(error.response));
});

axiosPublicInstance.interceptors.response.use(async (response) => {
  return response;
}, async (error) => {
  return Promise.reject(await exceptionHandler(error.response));
});

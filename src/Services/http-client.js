import axios from 'axios';

const requestAPI = "http://localhost:5293/"

export const axiosApi = axios.create({
    baseURL: requestAPI,
  });

export const httpClient = (config) => {
    return axiosInstance(config);
  };
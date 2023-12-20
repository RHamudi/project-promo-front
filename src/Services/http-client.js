import axios from 'axios';

const requestAPI = "http://192.168.1.71:5293/api/"

export const axiosApi = axios.create({
    baseURL: requestAPI,
  });

export const httpClient = (config) => {
    return axiosInstance(config);
  };
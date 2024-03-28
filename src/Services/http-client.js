import axios from 'axios';

const requestAPI = "http://3.143.14.147:80/api/"

export const axiosApi = axios.create({
    baseURL: requestAPI,
  });

export const httpClient = (config) => {
    return axiosInstance(config);
  };
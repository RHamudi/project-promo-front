import axios from 'axios';

const requestAPI = 'http://172.24.160.1:8080/api/';

export const axiosApi = axios.create({
  baseURL: requestAPI,
});

export const httpClient = (config) => {
  return axiosInstance(config);
};

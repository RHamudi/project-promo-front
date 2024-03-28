import axios from 'axios';

const requestAPI = "https://674e-2804-88c-73ce-f600-9d7e-6293-e934-dc7c.ngrok-free.app/api/"

export const axiosApi = axios.create({
    baseURL: requestAPI,
  });

export const httpClient = (config) => {
    return axiosInstance(config);
  };
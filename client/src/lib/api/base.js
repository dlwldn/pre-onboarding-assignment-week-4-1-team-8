import axios from 'axios';
import { HTTP_METHODS } from '../consts';

const customAxios = axios.create({});

const createApi = (axiosInstance, methodType) => (config) => {
  return axiosInstance({
    method: methodType,
    headers: {
      Authorization: ``,
    },
    ...config,
  });
};

const http = {
  get: createApi(customAxios, HTTP_METHODS.GET),
  post: createApi(customAxios, HTTP_METHODS.POST),
  put: createApi(customAxios, HTTP_METHODS.PUT),
  delete: createApi(customAxios, HTTP_METHODS.DELETE),
};

export default http;

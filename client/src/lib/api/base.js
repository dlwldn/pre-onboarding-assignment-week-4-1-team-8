import axios from 'axios';
import { HTTP_METHODS } from '../consts';
import storageKey from '../consts/storageKey';
import storage from '../util/storage';

const customAxios = axios.create({});

const createApi = (axiosInstance, methodType) => (config) => {
  return axiosInstance({
    method: methodType,
    headers: {
      Authorization: `Bearer ${storage.get(storageKey.TOKEN, '')}`,
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

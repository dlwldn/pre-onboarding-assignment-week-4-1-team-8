import { LOGIN_URL } from '../consts';
import http from './base';

export const login = async ({ email, password }) => {
  const response = await http.post({
    url: LOGIN_URL,
    data: {
      email,
      password,
    },
    headers: {}
  });

  return response.data;
};

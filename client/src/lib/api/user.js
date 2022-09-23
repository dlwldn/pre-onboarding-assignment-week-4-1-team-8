import { USER_SETTING_URL, USER_URL } from '../consts';
import http from './base';

export const getUsers = async ({ page, limit, keyword }) => {
  const response = await http.get({
    url: USER_URL,
    params: {
      _page: page,
      _limit: limit,
      q: keyword,
    },
  });

  return response.data;
};

export const getUserDetail = async ({ id }) => {
  const response = await http.get({
    url: `${USER_URL}/${id}`,
  });

  return response.data;
};

export const getUserSetting = async ({ page, limit }) => {
  const response = await http.get({
    url: USER_SETTING_URL,
    params: {
      _page: page,
      _limit: limit,
    },
  });

  return response.data;
};

export const searchUser = async (enteredText) => {
  const response = await http.get({
    url: USER_URL,
    params: {
      q: enteredText,
    },
  });
  
  return response.data;
};

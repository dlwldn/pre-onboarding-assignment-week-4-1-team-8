import { ACCOUNT_URL } from '../consts';
import http from './base';

export const getAccount = async ({ page, limit, keyword }) => {
  const response = await http.get({
    url: ACCOUNT_URL,
    params: {
      _page: page,
      _limit: limit,
      q: keyword
    },
  });

  return response.data;
};

export const getAccountDetail = async ({ id }) => {
  const response = await http.get({
    url: `${ACCOUNT_URL}/${id}`,
  });

  return response.data;
}
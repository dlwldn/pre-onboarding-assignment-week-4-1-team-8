import { ACCOUNT_URL } from '../consts';
import http from './base';

export const getAccount = async ({ page, limit }) => {
  const response = await http.get({
    url: ACCOUNT_URL,
    params: {
      _page: page,
      _limit: limit,
    },
  });

  return response.data;
};

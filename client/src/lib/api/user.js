import { USER_URL } from "../consts";
import http from "./base";

export const getUsers = async ({ page, limit, keyword }) => {
  const response = await http.get({
    url: USER_URL,
    params: {
      _page: page,
      _limit: limit,
      q: keyword
    }
  });

  return response.data;
}
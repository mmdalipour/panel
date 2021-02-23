import { AxiosRequestConfig } from 'axios';
import axios from 'lib/axios';
import { removeAuthCookie } from 'lib/Storage';

export type Response<T extends object> = {
  data?: T;
  success: boolean;
  timestamp: Date;
  moreInfo_FORDEV?: object;
};

export type LoginData = {
  accessToken: string;
  refreshToken: string;
};

const config: AxiosRequestConfig = { baseURL: process.env.REACT_APP_BASE_AUTH_API_URL };

/**
 * @function login
 * @param email
 * @param password
 * @summary request for new refresh, access token using email and password
 */
export const login = async (email: string, password: string) => {
  return await axios.post<Response<LoginData>>('/auth/signin', { email, password }, config);
};

export type RefreshAccessTokenData = {
  accessToken: string;
};

/**
 * @function refreshAccessToken
 * @param refreshToken refresh token to get new access token
 * @summary requests new access token with refresh token
 */
export const refreshAccessToken = async (refreshToken: string) => {
  return await axios.post<Response<RefreshAccessTokenData>>('/auth/refresh-token', { refreshToken }, config);
};

/**
 * @function verifyAccessToken
 * @summary sends blank request with authentication token headers to check if they are still valid
 */
export const verifyAccessToken = async () => {
  return await axios.post<Response<never>>('/auth/does-token-expires', null, config);
};

/**
 * @function logout
 */
export const logout = (): void => {
  removeAuthCookie();
  // eslint-disable-next-line no-restricted-globals
  location.reload();
};

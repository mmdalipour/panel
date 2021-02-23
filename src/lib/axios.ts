import axios, { AxiosResponse } from 'axios';

// api
import { refreshAccessToken, RefreshAccessTokenData } from 'api/auth';
import { getAuthCookie, removeAuthCookie, setAuthCookie } from './Storage';

export enum HTTP_STATUS {
  GONE = 410,
  Conflict = 409,
  Forbidden = 403,
  NotFound = 404,
  BadRequest = 400,
  NotAuthorized = 401,
  TooManyRequests = 429,
  ServerInternal = 500,
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

// Request interceptor for API calls
instance.interceptors.request.use(
  async (config) => {
    const keys = getAuthCookie();
    config.headers = {
      ...(keys && { Authorization: `Bearer ${keys.accessToken}` }),
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const responseInterceptor = instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    // Reject promise if usual error
    if (error?.response?.status !== HTTP_STATUS.NotAuthorized) {
      return Promise.reject(error);
    }

    /*
     * When response code is 401, try to refresh the token.
     * Eject the interceptor so it doesn't loop in case
     * token refresh causes the 401 response
     */
    instance.interceptors.response.eject(responseInterceptor);

    try {
      const keys = getAuthCookie();
      const {
        data: { data },
      } = await refreshAccessToken(keys.refreshToken as string);

      const accessToken = (data as RefreshAccessTokenData).accessToken;

      setAuthCookie({ accessToken, refreshToken: keys.refreshToken as string });

      error.response.config.headers['Authorization'] = `Bearer ${accessToken}`;
      return instance(error.response.config);
    } catch (error) {
      removeAuthCookie();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
      return Promise.reject(error);
    }
  }
);

export default instance;

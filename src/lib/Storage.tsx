import { settings } from 'cluster';
import { Settings } from 'providers/SettingsProvider';
import Cookies from 'universal-cookie';

export type Auth = {
  accessToken?: string;
  refreshToken?: string;
};

/**
 * @function setItem stores data in Storage with expire date
 * @param key stored data key
 * @param value value to store
 * @param expire expire data can be undefined to not set expire data
 */
export const setItem = (key: string, value: string, expire?: number) => {
  if (expire) {
    const now = Date.now();
    const expiresIn = now + expire * 1000;
    localStorage.setItem(`${key}_expiresIn`, expiresIn.toString());
  }
  localStorage.setItem(key, value);
};

/**
 * @function getItem checks if data has expire data if true and has passed that time will remove all data otherwise return data
 * @param key sotred data key
 */
export const getItem = (key: string) => {
  const expiresIn = localStorage.getItem(`${key}_expiresIn`);
  if (expiresIn) {
    const now = Date.now();

    if (Number(expiresIn) > now) {
      // expired
      localStorage.removeItem(key);
      localStorage.removeItem(`${key}_expiresIn`);

      return;
    } else {
      return localStorage.getItem(key);
    }
  } else {
    return localStorage.getItem(key);
  }
};

export const setAuthCookie = (authTokens: Auth) => {
  const cookies = new Cookies();
  cookies.set('authTokens', JSON.stringify(authTokens), {
    path: '/',
    maxAge: 10000000000000,
    sameSite: true,
  });
};

export const removeAuthCookie = () => {
  const cookies = new Cookies();
  cookies.remove('authTokens', { path: '/' });
};

export const getAuthCookie = (): Auth => {
  const cookies = new Cookies();
  return cookies.get('authTokens');
};

export const setSettingInStorage = (settings: Settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};

export const getSettingsInStorage = (): Settings => {
  return JSON.parse(localStorage.getItem('settings') as string) as Settings;
};

export const removeSettingsInStorage = () => {
  localStorage.removeItem('settings');
};

export const setConsentCookie = (value: boolean) => {
  const cookies = new Cookies();
  return cookies.set('consent', value.toString(), {
    path: '/',
    maxAge: 1000 * 3600 * 24 * 30 * 2, // 2 months
    sameSite: true,
  });
};

export const getConsentCookie = (): boolean => {
  const cookies = new Cookies();
  return cookies.get('consent') === 'true';
};

import axios from 'lib/axios';

import { Response } from './auth';

export type Banner = {
  _id: string;
  name: string;
  picture: string;
  thumbnail: string;
  code: number;
};

/**
 * @function getBanners
 * @summary request for all Banners
 */
async function getBanners() {
  const { data } = await axios.get<Response<Banner[]>>('/banners');
  return data;
}
/**
 * @function getBanner
 * @summary request for a Banner by code
 */
async function getBanner(code: number) {
  const { data } = await axios.get<Response<Banner>>(`/banners/${code}`);
  return data;
}

/**
 * @function createBanner
 * @param formData
 * @summary request for creation a Banner
 */
async function createBanner(formData: Banner) {
  const { data } = await axios.post<Response<Banner>>(`/banners`, formData);
  return data;
}

/**
 * @function updateBanner
 * @param code
 * @param Banner
 * @summary request for updating a Banner
 */
async function updateBanner({ code, ...banner }: { code: number; banner: Banner }) {
  const { data } = await axios.put<Response<Banner>>(`/banners/${code}`, banner);
  return data;
}

/**
 * @function deleteBanner
 * @param code
 * @summary request for deleting a Banner
 */
async function deleteBanner(code: number) {
  const { data } = await axios.delete<Response<Banner>>(`/banners/${code}`);
  return data;
}

export { getBanners, getBanner, createBanner, updateBanner, deleteBanner };

import axios from 'lib/axios';

import { Response } from './auth';
export type Brand = {
  _id: string;
  name: string;
};

/**
 * @function getBrands
 * @summary request for all brands
 */
async function getBrands() {
  const { data } = await axios.get<Response<Brand[]>>('/brands');
  return data;
}

/**
 * @function getBrand
 * @summary request for a Brand by id
 */
async function getBrand(code: number) {
  const { data } = await axios.get<Response<Brand>>(`/brands/${code}`);
  return data;
}

/**
 * @function createBrand
 * @param formData
 * @summary request for creation a Brand
 */
async function createBrand(formData: Brand) {
  const { data } = await axios.post<Response<Brand>>(`/brands`, formData);
  return data;
}

/**
 * @function updateBrand
 * @param id
 * @param Brand
 * @summary request for updating a Brand
 */
async function updateBrand({ code, ...brand }: { code: number; brand: Brand }) {
  const { data } = await axios.put<Response<Brand>>(`/brands/${code}`, brand);
  return data;
}

/**
 * @function deleteBrand
 * @param id
 * @summary request for deleting a Brand
 */
async function deleteBrand(code: number) {
  const { data } = await axios.delete<Response<Brand>>(`/brands/${code}`);
  return data;
}

export { getBrands, getBrand, createBrand, updateBrand, deleteBrand };

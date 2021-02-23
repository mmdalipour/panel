import axios from 'lib/axios';

import { Response } from './auth';

export type Category = {
  _id?: string;
  name: string;
  picture: string;
  thumbnail: string;
  parent: {
    _id: string;
    name: string;
  };
  code: number;
};

/**
 * @function getCategories
 * @summary request for all categories
 */
async function getCategories() {
  const { data } = await axios.get<Response<Category[]>>('/categories');
  return data;
}
/**
 * @function getCategory
 * @summary request for a category by code
 */
async function getCategory(code: number) {
  const { data } = await axios.get<Response<Category>>(`/categories/${code}`);
  return data;
}

/**
 * @function createCategory
 * @param formData
 * @summary request for creation a Category
 */
async function createCategory(formData: Category) {
  const { data } = await axios.post<Response<Category>>(`/categories`, formData);
  return data;
}

/**
 * @function updateCategory
 * @param code
 * @param Category
 * @summary request for updating a Category
 */
async function updateCategory({ code, ...category }: { code: number; category: Category }) {
  const { data } = await axios.put<Response<Category>>(`/categories/${code}`, category);
  return data;
}

/**
 * @function deleteCategory
 * @param code
 * @summary request for deleting a Category
 */
async function deleteCategory(code: number) {
  const { data } = await axios.delete<Response<Category>>(`/categories/${code}`);
  return data;
}

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory };

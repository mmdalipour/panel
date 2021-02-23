import axios from 'lib/axios';

// types
import { Brand } from './brand';
import { Category } from './category';
import { Response } from './auth';

export type Product = {
  _id?: string;
  title: string;
  visits?: number;
  remainingNumber: number;
  price: number;
  category: Category | any;
  brand: Brand | any;
  thumbnail?: string;
  code?: number;
};

/**
 * @function getProducts
 * @summary request for all products
 */
async function getProducts() {
  const { data } = await axios.get<Response<Product[]>>('/products?sort=-createdAt');
  return data;
}

/**
 * @function getProduct
 * @param code
 * @summary request for  product by code
 */
async function getProduct(code: number) {
  const { data } = await axios.get<Response<Product>>(`/products/${code}`);
  return data;
}

/**
 * @function createProduct
 * @param formData
 * @summary request for creation a product
 */
async function createProduct(formData: Product) {
  const { data } = await axios.post<Response<Product>>(`/products`, formData);
  return data;
}

/**
 * @function updateProduct
 * @param id
 * @param product
 * @summary request for updating a product
 */
async function updateProduct({ code, ...product }: { code: number; product: Product }) {
  const { data } = await axios.put<Response<Product>>(`/products/${code}`, product);
  return data;
}

/**
 * @function deleteProduct
 * @param id
 * @summary request for deleting a product
 */
async function deleteProduct(code: number) {
  const { data } = await axios.delete<Response<Product>>(`/products/${code}`);
  return data;
}

export { getProducts, getProduct, updateProduct, deleteProduct, createProduct };

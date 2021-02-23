import { User } from 'api/user';
import { Product } from 'api/product';
import axios from 'lib/axios';
import { Response } from './auth';

export type Order = {
  _id: string;
  products: Product[];
  user: User;
  payment: any;
  status: string;
  createdAt: string;
  code: number;
};

/**
 * @function getOrders
 * @summary request for all Orders
 */
async function getOrders() {
  const { data } = await axios.get<Response<Order[]>>('/orders');
  return data;
}
/**
 * @function getOrder
 * @summary request for a Order by code
 */
async function getOrder(code: number) {
  const { data } = await axios.get<Response<Order>>(`/orders/${code}`);
  return data;
}

/**
 * @function deleteOrder
 * @param code
 * @summary request for deleting a Order
 */
async function deleteOrder(code: number) {
  const { data } = await axios.delete<Response<Order>>(`/orders/${code}`);
  return data;
}

export { getOrders, getOrder, deleteOrder };

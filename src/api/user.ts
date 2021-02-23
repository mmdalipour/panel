import axios from 'lib/axios';

import { Response } from './auth';

export type address = {
  country: string;
  state: string;
  city: string;
  direction: string;
  streetName: string;
  cardinalDirection: string;
  countryCode: string;
  latitude: string;
};

export type User = {
  _id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  wishLists: any;
  addresses: address[];
  credit: number;
  roles: any;
  code: number;
};

/**
 * @function getUsers
 * @summary request for all users
 */
async function getUsers() {
  const { data } = await axios.get<Response<User[]>>('/users');
  return data;
}

/**
 * @function getUser
 * @param code
 * @summary request for user by code
 */
async function getUser(code: number) {
  const { data } = await axios.get<Response<User>>(`/users/${code}`);
  return data;
}

/**
 * @function createUser
 * @param formData
 * @summary request for creation a user
 */
async function createUser(formData: User) {
  const { data } = await axios.post<Response<User>>(`/products`, formData);
  return data;
}

/**
 * @function updateUser
 * @param code
 * @param user
 * @summary request for updating a product
 */
async function updateUser({ code, ...user }: { code: number; user: User }) {
  const { data } = await axios.put<Response<User>>(`/users/${code}`, user);
  return data;
}

/**
 * @function deleteUser
 * @param code
 * @summary request for deleting a user
 */
async function deleteUser(code: number) {
  const { data } = await axios.delete<Response<User>>(`/users/${code}`);
  return data;
}

export { getUsers, getUser, createUser, updateUser, deleteUser };

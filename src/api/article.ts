import axios from 'lib/axios';

import { Response } from './auth';

export type Author = {
  _id: string;
};

export type Article = {
  _id: string;
  title: string;
  description: string;
  body: string;
  author: Author;
  thumbnail: string;
  published: boolean;
  createdAt: Date;
  code: number;
};

/**
 * @function getArticles
 * @summary request for all Articles
 */
async function getArticles() {
  const { data } = await axios.get<Response<Article[]>>('/articles');
  return data;
}
/**
 * @function getArticle
 * @summary request for a Article by code
 */
async function getArticle(code: number) {
  const { data } = await axios.get<Response<Article>>(`/articles/${code}`);
  return data;
}

/**
 * @function createArticle
 * @param formData
 * @summary request for creation a Article
 */
async function createArticle(formData: Article) {
  const { data } = await axios.post<Response<Article>>(`/articles`, formData);
  return data;
}

/**
 * @function updateArticle
 * @param code
 * @param Article
 * @summary request for updating a Article
 */
async function updateArticle({ code, ...article }: { code: number; article: Article }) {
  const { data } = await axios.put<Response<Article>>(`/articles/${code}`, article);
  return data;
}

/**
 * @function deleteArticle
 * @param code
 * @summary request for deleting a Article
 */
async function deleteArticle(code: number) {
  const { data } = await axios.delete<Response<Article>>(`/articles/${code}`);
  return data;
}

export { getArticles, getArticle, createArticle, updateArticle, deleteArticle };

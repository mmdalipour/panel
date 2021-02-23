import { Product } from './../../api/product';
import { getProducts, createProduct, deleteProduct, getProduct } from 'api/product';
import { Response } from 'api/auth';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

/**
 * @function useAllProducts
 * @param page
 * @summary get all  products
 */
function useAllProducts() {
  return useQuery<Response<Product[]>, Error>('products', getProducts, {
    cacheTime: 5000,
  });
}

/**
 * @function useProduct
 * @param code
 * @summary get product by code
 */
function useProduct(code: number) {
  return useQuery<Response<Product>, Error>(['product', code], () => getProduct(code));
}

/**
 * @function useCreateProduct
 * @param product
 * @summary create a product
 */
function useCreateProduct(product: Product) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  return useMutation<Response<Product>, Error>(() => createProduct(product), {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      history.push('/products');
      enqueueSnackbar('محصول با موفقیت اضافه شد', { variant: 'success' });
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: 'error' }) as any,
  });
}

/**
 * @function useDeleteProduct
 * @summary delete a product
 */
function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      enqueueSnackbar('محصول با موفقیت حذف شد.', { variant: 'info' });
    },

    onError: (error) => enqueueSnackbar('مشکلی پیش آمده است.', { variant: 'error' }) as any,
  });
}

export { useAllProducts, useProduct, useCreateProduct, useDeleteProduct };

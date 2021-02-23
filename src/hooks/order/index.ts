import { Order, getOrders, getOrder, deleteOrder } from 'api/order';
import { Response } from 'api/auth';

// hooks
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

/**
 * @function useAllOrders
 * @summary get all Orders
 */
function useAllOrders() {
  return useQuery<Response<Order[]>, Error>('orders', getOrders);
}

/**
 * @function useOrder
 * @param code
 * @summary get Order by code
 */
function useOrder(code: number) {
  return useQuery<Response<Order>, Error>(['order', code], () => getOrder(code));
}

/**
 * @function useDeleteOrder
 * @summary delete a Order
 */
function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
      enqueueSnackbar('سفارش با موفقیت حذف شد.', { variant: 'info' });
    },

    onError: (error) => enqueueSnackbar('مشکلی پیش آمده است.', { variant: 'error' }) as any,
  });
}

export { useAllOrders, useOrder, useDeleteOrder };

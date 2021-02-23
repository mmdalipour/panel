import {
  Category,
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from 'api/category';
import { Response } from 'api/auth';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

/**
 * @function useCategories
 * @summary get all Categories
 */
function useCategories() {
  return useQuery<Response<Category[]>, Error>('categories', getCategories);
}

/**
 * @function useCategory
 * @param code
 * @summary get Category by code
 */
function useCategory(code: number) {
  return useQuery<Response<Category>, Error>(['category', code], () => getCategory(code));
}

/**
 * @function useCreateCategory
 * @param Category
 * @summary create a Category
 */
function useCreateCategory(category: Category) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  return useMutation<Response<Category>, Error>(() => createCategory(category), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      history.push('/categories');
      enqueueSnackbar('دسته بندی با موفقیت اضافه شد', { variant: 'success' });
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: 'error' }) as any,
  });
}

/**
 * @function useDeleteCategory
 * @summary delete a Category
 */
function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      enqueueSnackbar('دسته بندی با موفقیت حذف شد.', { variant: 'info' });
    },

    onError: (error) => enqueueSnackbar('مشکلی پیش آمده است.', { variant: 'error' }) as any,
  });
}

export { useCategories, useCategory, useCreateCategory, useDeleteCategory };

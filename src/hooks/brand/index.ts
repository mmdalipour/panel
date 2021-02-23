import { Brand, getBrands, getBrand, createBrand, deleteBrand } from 'api/brand';
import { Response } from 'api/auth';

// hooks
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

/**
 * @function useBrands
 * @summary get all brands
 */
function useBrands() {
  return useQuery<Response<Brand[]>, Error>('brands', getBrands);
}

/**
 * @function useBrand
 * @param code
 * @summary get Brand by code
 */
function useBrand(code: number) {
  return useQuery<Response<Brand>, Error>(['brand', code], () => getBrand(code));
}

/**
 * @function useCreateBrand
 * @param Brand
 * @summary create a Brand
 */
function useCreateBrand(brand: Brand) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  return useMutation<Response<Brand>, Error>(() => createBrand(brand), {
    onSuccess: () => {
      queryClient.invalidateQueries('brands');
      history.push('/brands');
      enqueueSnackbar('برند با موفقیت اضافه شد', { variant: 'success' });
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: 'error' }) as any,
  });
}

/**
 * @function useDeleteBrand
 * @summary delete a Brand
 */
function useDeleteBrand() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(deleteBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries('brands');
      enqueueSnackbar('برند با موفقیت حذف شد.', { variant: 'info' });
    },

    onError: (error) => enqueueSnackbar('مشکلی پیش آمده است.', { variant: 'error' }) as any,
  });
}

export { useBrands, useBrand, useCreateBrand, useDeleteBrand };

import { Banner, createBanner, getBanners, getBanner, deleteBanner } from 'api/banner';
import { Response } from 'api/auth';

// hooks
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

/**
 * @function useAllBanners
 * @summary get all Banners
 */

function useAllBanners() {
  return useQuery<Response<Banner[]>, Error>('banners', getBanners);
}

/**
 * @function useBanner
 * @param code
 * @summary get Banner by code
 */
function useBanner(code: number) {
  return useQuery<Response<Banner>, Error>(['banner', code], () => getBanner(code));
}

/**
 * @function useCreateBanner
 * @param Banner
 * @summary create a Banner
 */
function useCreateBanner(Banner: Banner) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  return useMutation<Response<Banner>, Error>(() => createBanner(Banner), {
    onSuccess: () => {
      queryClient.invalidateQueries('banners');
      history.push('/ads');
      enqueueSnackbar('بنر با موفقیت اضافه شد', { variant: 'success' });
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: 'error' }) as any,
  });
}

/**
 * @function useDeleteBanner
 * @summary delete a Banner
 */
function useDeleteBanner() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(deleteBanner, {
    onSuccess: () => {
      queryClient.invalidateQueries('banners');
      enqueueSnackbar('بنر با موفقیت حذف شد.', { variant: 'info' });
    },

    onError: (error) => enqueueSnackbar('مشکلی پیش آمده است.', { variant: 'error' }) as any,
  });
}

export { useAllBanners, useBanner, useCreateBanner, useDeleteBanner };

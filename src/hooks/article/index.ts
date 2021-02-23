import { Article, getArticles, getArticle, deleteArticle, createArticle } from 'api/article';
import { Response } from 'api/auth';

// hooks
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

/**
 * @function useAllArticles
 * @summary useAllArticles
 */
function useAllArticles() {
  return useQuery<Response<Article[]>, Error>('articles', getArticles);
}

/**
 * @function useArticle
 * @param code
 * @summary get Article by id
 */
function useArticle(code: number) {
  return useQuery<Response<Article>, Error>(['article', code], () => getArticle(code));
}

/**
 * @function useCreateArticle
 * @param Article
 * @summary create a Article
 */
function useCreateArticle(article: Article) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  return useMutation<Response<Article>, Error>(() => createArticle(article), {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      history.push('/Articles');
      enqueueSnackbar('مقاله با موفقیت اضافه شد', { variant: 'success' });
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: 'error' }) as any,
  });
}

/**
 * @function useDeleteArticle
 * @summary delete a Article
 */
function useDeleteArticle() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries('articles');
      enqueueSnackbar('مقاله با موفقیت حذف شد.', { variant: 'info' });
    },

    onError: (error) => enqueueSnackbar('مشکلی پیش آمده است.', { variant: 'error' }) as any,
  });
}

export { useAllArticles, useArticle, useCreateArticle, useDeleteArticle };

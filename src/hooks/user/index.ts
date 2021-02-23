import { User, getUsers, deleteUser, createUser } from 'api/user';
import { Response } from 'api/auth';

import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

/**
 * @function useAllUsers
 * @param page
 * @summary create a User
 */
function useAllUsers() {
  return useQuery<Response<User[]>, Error>('users', getUsers);
}

/**
 * @function useCreateUser
 * @param User
 * @summary create a User
 */
function useCreateUser(user: User) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  return useMutation<Response<User>, Error>(() => createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries('Users');
      history.push('/Users');
      enqueueSnackbar('کاربر به موفقیت اضافه شد.', { variant: 'success' });
    },
    onError: (error) => enqueueSnackbar(error.message, { variant: 'error' }) as any,
  });
}

/**
 * @function useDeleteUser
 * @summary delete a User
 */
function useDeleteUser() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(deleteUser, {
    onSuccess: (_, code) => {
      const Users = queryClient.getQueryData('users') as User[];
      const data = Users.filter((item: User) => item.code !== code);
      queryClient.setQueryData('users', data);
      enqueueSnackbar('کاربر به موفقیت حذف شد.', { variant: 'info' });
    },
  });
}

export { useAllUsers, useDeleteUser, useCreateUser };

import { User } from 'api/user';
import { isArray } from 'lodash';
// components
import Table from 'components/Table';
import UserWithAvatar from 'components/UserWithAvatar';
import Spinner from 'components/shared/Spinner';

// hooks
import { useAllUsers } from 'hooks/user';

export type UsersTableProps = {};

/**
 * @component UsersTable
 */
function UsersTable() {
  const { data, isLoading } = useAllUsers();
  const users = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <Table
      title="کاربران"
      columns={[
        {
          field: 'fullName',
          title: 'کاربر',
          render: (row) => {
            const name = row.fullName;
            const avatar = row.avatar;
            return <UserWithAvatar avatar={avatar} username={name} id={row._id} />;
          },
        },
        { field: 'email', title: 'ایمیل' },
        {
          field: 'addresses',
          title: 'کشور/ استان',
          render: (row) => row.addresses[0].state,
        },
        { field: 'phoneNumber', title: 'شماره تماس' },
      ]}
      data={users as User[]}
      actions={[
        {
          label: 'حذف',
          onClick: (row) => {
            if (!isArray(row)) {
              alert(row.code);
            }
          },
        },
        { label: 'ویرایش', disableBulk: true },
      ]}
    />
  );
}

export default UsersTable;

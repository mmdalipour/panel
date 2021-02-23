import { Link } from 'react-router-dom';

// components
import UsersTable from './UsersTable';
import Button from '@material-ui/core/Button';
import PageWithTitle from 'components/PageWithTitle';

/**
 * @component Users
 */
function Users() {
  return (
    <PageWithTitle
      title="کاربران"
      subtitle="لیست کاربرانی که در فروشگاه شما ثبت نام کرده اند"
    >
      <UsersTable />
    </PageWithTitle>
  );
}

export default Users;

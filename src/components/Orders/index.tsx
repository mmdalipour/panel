// components
import OrdersTable from './OrdersTable';
import PageWithTitle from 'components/PageWithTitle';

/**
 * @component Orders
 */
function Orders() {
  return (
    <PageWithTitle title="سفارشات" subtitle="لیست سفارشاتی که در فروشگاه ثبت شده اند">
      <OrdersTable />
    </PageWithTitle>
  );
}

export default Orders;

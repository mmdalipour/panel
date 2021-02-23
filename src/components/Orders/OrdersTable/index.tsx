import { Order } from 'api/order';

// components
import Table from 'components/Table';
import StatusChip from 'components/StatusChip';
import Typography from '@material-ui/core/Typography';
import Spinner from 'components/shared/Spinner';

// hooks
import { useAllOrders } from 'hooks/order';

/**
 * @component OrdersTable
 */
function OrdersTable() {
  const { data, isLoading } = useAllOrders();
  const orders = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <Table
      title="سفارشات"
      columns={[
        {
          field: '_id',
          title: 'شماره سفارش',
          render: (row) => (
            <Typography variant="body2" color="textSecondary">
              {row._id}
            </Typography>
          ),
        },
        {
          field: 'user',
          title: 'سفارش دهنده',
          render: (row) => row.user?.fullName,
        },
        {
          field: 'products',
          title: 'تعداد محصولات',
          render: (row) => row.products?.length,
        },

        {
          field: 'createdAt',
          title: 'تاریخ سفارش',
          render: (row) => new Date(row.createdAt).toLocaleDateString(),
        },
        {
          field: 'status',
          title: 'وضعیت',
          tableCellProps: {
            align: 'left',
          },
          render: (row) => {
            const getStatus = () => {
              switch (row.status) {
                case 'processing':
                  return {
                    type: 'warning',
                    text: 'در انتظار',
                  };
                case 'canceled':
                  return {
                    type: 'error',
                    text: 'مرجوع شده',
                  };
                case 'delivered':
                  return {
                    type: 'success',
                    text: 'انجام شده',
                  };
                default:
                  return {
                    type: 'success',
                    text: 'انجام شده',
                  };
              }
            };

            const status = getStatus();
            return <StatusChip type={status.type as any} text={status.text} />;
          },
        },
      ]}
      data={orders as Order[]}
      actions={[
        {
          label: 'حذف',
        },
        { label: 'نمایش جزییات', disableBulk: true },
      ]}
    />
  );
}

export default OrdersTable;

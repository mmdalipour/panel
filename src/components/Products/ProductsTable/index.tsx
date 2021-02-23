import { Product } from 'api/product';
import { isArray } from 'lodash';

// components
import Table from 'components/Table';
import StatusChip from 'components/StatusChip';
import TextWithPopper from 'components/TextWithPopper';
import Spinner from 'components/shared/Spinner';

// hooks
import { useAllProducts, useDeleteProduct } from 'hooks/product';
import { useHistory } from 'react-router-dom';

/**
 * @component ProductsTable
 */
function ProductsTable() {
  const history = useHistory();

  const { data, isLoading } = useAllProducts();
  const products = data?.data;
  const remove = useDeleteProduct();
  if (isLoading) return <Spinner />;
  return (
    <Table
      title="محصولات"
      columns={[
        {
          field: '_id',
          title: 'شماره محصول',
          render: (row) => {
            return (
              <TextWithPopper
                variant="body2"
                color="textSecondary"
                text={row._id as string}
              >
                <img src={row.thumbnail} alt={row.title} />
              </TextWithPopper>
            );
          },
        },
        { field: 'title', title: 'نام محصول' },
        { field: 'remainingNumber', title: 'تعداد' },
        { field: 'price', title: 'قیمت' },
        {
          field: 'category',
          title: 'دسته بندی',
          render: (row) =>
            row.category?.name ? (
              row.category.name
            ) : (
              <StatusChip type="error" text="ندارد" />
            ),
        },
        {
          field: 'remainingNumber',
          title: 'وضعیت',
          render: (row) => {
            return (row.remainingNumber as number) <= 0 ? (
              <StatusChip type="error" text="اتمام" />
            ) : (
              <StatusChip type="success" text="موجود" />
            );
          },
        },
      ]}
      data={products as Product[]}
      actions={[
        {
          label: 'حذف',
          onClick: (row) => {
            if (!isArray(row)) {
              remove.mutate(row.code as number);
            }
          },
        },
        {
          label: 'ویرایش',
          onClick: (row) => {
            if (!isArray(row)) {
              history.push(`products/update-product/${row.code as number}`);
            }
          },
        },
      ]}
    />
  );
}

export default ProductsTable;

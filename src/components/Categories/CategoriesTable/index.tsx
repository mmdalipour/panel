import { Category } from 'api/category';

// components
import Table from 'components/Table';
import Typography from '@material-ui/core/Typography';
import Spinner from 'components/shared/Spinner';

// hooks
import { useCategories } from 'hooks/category';

/**
 * @component CategoriesTable
 */
function CategoriesTable() {
  const { data, isLoading } = useCategories();
  const categories = data?.data;

  if (isLoading) return <Spinner />;
  return (
    <Table
      title="دسته بندی ها"
      columns={[
        {
          field: '_id',
          title: 'شماره دسته بندی',
          render: (row) => (
            <Typography variant="body2" color="textSecondary">
              {row._id}
            </Typography>
          ),
        },
        { field: 'name', title: 'نام دسته بندی' },

        { field: 'name', title: 'تعداد محصولات', render: (row) => row.name?.length },
      ]}
      data={categories as Category[]}
      parentChildData={(row, rows) => rows.find((item) => item._id === row.parent?._id)}
      actions={[
        {
          label: 'حذف',
        },
        { label: 'ویرایش', disableBulk: true },
        { label: 'نمایش جزییات', disableBulk: true },
      ]}
    />
  );
}

export default CategoriesTable;

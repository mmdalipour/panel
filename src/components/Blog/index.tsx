import { Article } from 'api/article';

import { Link } from 'react-router-dom';

// hooks
import { useAllArticles } from 'hooks/article';

// components
import Table from 'components/Table';
import StatusChip from 'components/StatusChip';
import Spinner from 'components/shared/Spinner';
import PageWithTitle from 'components/PageWithTitle';
import Button from '@material-ui/core/Button';

/**
 * @component Blog
 */
function Blog() {
  const { data, isLoading } = useAllArticles();
  const articles = data?.data;

  return (
    <PageWithTitle
      title="پست ها"
      subtitle="لیست پست هایی که در بلاگ شا به نمایش گذاشته می شوند"
      renderAction={() => {
        return (
          <Link to="/blog/add-post">
            <Button variant="contained" color="primary">
              اضافه کردن پست
            </Button>
          </Link>
        );
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Table
          title="پست ها"
          columns={[
            { field: 'title', title: 'عنوان' },
            {
              field: 'author',
              title: 'ناشر',
              render: (row) => row.author?._id,
            },
            {
              field: 'createdAt',
              title: 'تاریخ ایجاد',
              render: (row) => new Date(row.createdAt).toDateString(),
            },
            {
              field: 'published',
              title: 'وضعیت',
              tableCellProps: {
                align: 'left',
              },
              render: (row) =>
                row.published ? <StatusChip type="success" text="منشتر شده" /> : <StatusChip type="warning" text="منتشر نشده" />,
            },
          ]}
          data={articles as Article[]}
          actions={[
            {
              label: 'حذف',
            },
            { label: 'ویرایش', disableBulk: true },
            { label: 'نمایش جزییات', disableBulk: true },
          ]}
        />
      )}
    </PageWithTitle>
  );
}

export default Blog;

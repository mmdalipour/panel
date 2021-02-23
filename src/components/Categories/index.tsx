import { Link } from 'react-router-dom';

// components
import CategoriesTable from './CategoriesTable';
import Button from '@material-ui/core/Button';
import PageWithTitle from 'components/PageWithTitle';

/**
 * @component Categories
 */
function Categories() {
  return (
    <PageWithTitle
      title="دسته بندی ها"
      subtitle="لیست دسته بندی هایی که برای محصولات شما وجود دارند"
      renderAction={() => {
        return (
          <Link to="categories/add-category">
            <Button variant="contained" color="primary">
              اضافه کردن دسته بندی
            </Button>
          </Link>
        );
      }}
    >
      <CategoriesTable />
    </PageWithTitle>
  );
}

export default Categories;

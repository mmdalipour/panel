import { Link } from 'react-router-dom';

// components
import ProductsTable from './ProductsTable';
import Button from '@material-ui/core/Button';
import PageWithTitle from 'components/PageWithTitle';

/**
 * @component Products
 */
function Products() {
  return (
    <PageWithTitle
      title="محصولات"
      subtitle="لیست محصولاتی که در فروشگاه وجود دارند"
      renderAction={() => {
        return (
          <Link to="products/add-product">
            <Button variant="contained" color="primary">
              اضافه کردن محصول
            </Button>
          </Link>
        );
      }}
    >
      <ProductsTable />
    </PageWithTitle>
  );
}

export default Products;

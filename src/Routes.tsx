import { lazy, Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProgressBar from 'react-topbar-progress-indicator';
import { fade, useTheme } from '@material-ui/core/styles';
import Auth from 'components/Auth';

// templates
import DefaultTemplate from 'templates/DefaultTemplate';

// providers
import { useNavigationDrawerSetState } from 'providers/NavigationDrawerProvider';

// LazyComponents
const Dashboard = lazy(() => import('components/Dashboard'));
const UsersPage = lazy(() => import('components/Users'));
const AdsPage = lazy(() => import('components/Ads'));
const Products = lazy(() => import('components/Products'));
const Orders = lazy(() => import('components/Orders'));
const Categories = lazy(() => import('components/Categories'));
const Blog = lazy(() => import('components/Blog'));
const AddPost = lazy(() => import('components/AddPost'));
const AddProduct = lazy(() => import('components/AddProduct'));
const UpdateProduct = lazy(() => import('components/UpdateProduct'));
const AddCategory = lazy(() => import('components/AddCategory'));
const NotFound = lazy(() => import('components/NotFound'));

/**
 * @component Routes
 */
function Routes() {
  const setNavigationOpen = useNavigationDrawerSetState();
  const history = useHistory();
  const theme = useTheme();
  history.listen(() => {
    setNavigationOpen(false);
    window.scrollTo(0, 0);
  });

  ProgressBar.config({
    barColors: {
      0: fade(theme.palette.primary.main, 0.7),
      '1.0': theme.palette.primary.main,
    },
    shadowBlur: 5,
  });

  return (
    <Switch>
      <Route component={Auth} path="/login" />
      <Route>
        <DefaultTemplate>
          <Suspense fallback={<ProgressBar />}>
            <Switch>
              <Route component={Dashboard} exact path={'(/|/dashboard)'} />
              <Route component={UsersPage} path="/users" />
              <Route exact component={Products} path="/products" />
              <Route component={AddProduct} path="/products/add-product" />
              <Route component={UpdateProduct} path="/products/update-product/:id" />
              <Route component={AdsPage} path="/ads" />
              <Route component={Orders} path="/orders" />
              <Route exact component={Categories} path="/categories" />
              <Route component={AddCategory} path="/categories/add-category" />
              <Route exact component={Blog} path="/blog" />
              <Route component={AddPost} path="/blog/add-post" />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </DefaultTemplate>
      </Route>
    </Switch>
  );
}

export default Routes;

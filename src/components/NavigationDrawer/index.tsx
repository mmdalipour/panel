import { makeStyles, Theme } from '@material-ui/core/styles';

// constants
import { SPACING_HALF, SPACING_LEAST } from 'constants/spacing';

// providers
import { useNavigationDrawerState } from 'providers/NavigationDrawerProvider';

// components
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import LogoWithTitle from 'components/LogoWithTitle';
import NavigationItemCore, { NavigationItem } from 'components/NavigationItem';

// icons
import DashboardIcon from 'components/shared/icons/Dashboard';
import UsersIcon from 'components/shared/icons/Users';
import ProductsIcon from 'components/shared/icons/Products';
import AdsIcon from 'components/shared/icons/Ads';
import BlogIcon from 'components/shared/icons/Blog';
import CategoriesIcon from 'components/shared/icons/Categories';
import OrdersIcon from 'components/shared/icons/Orders';
import SettingsIcon from 'components/shared/icons/Settings';
import SecurityIcon from 'components/shared/icons/Security';

export const DRAWER_WIDTH = 350;

const useStyles = makeStyles((theme: Theme) => ({
  logoSection: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(SPACING_HALF),
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    overflow: 'hidden',
    width: DRAWER_WIDTH,
    background: theme.palette.sideBar.background,
  },
  content: {
    height: '100%',
    color: theme.palette.sideBar.color,
    display: 'flex',
    flexDirection: 'column',
  },

  userBoxText: {
    color: theme.palette.secondary.main,
  },
  sideBarFooter: {
    backgroundColor: theme.palette.sideBar.footer.background,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(SPACING_HALF),
  },
  owner: {
    marginLeft: theme.spacing(SPACING_LEAST),
  },
  list: {
    overflow: 'auto',
    flex: 1,
    '&::-webkit-scrollbar': {
      width: '0px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'none',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'none',
    },
  },
}));

export type NavigationDrawerProps = {};

const data: NavigationItem[] = [
  {
    text: 'داشبورد',
    icon: <DashboardIcon />,
    to: '/dashboard',
  },
  {
    text: 'کاربران',
    to: '/users',
    icon: <UsersIcon />,
  },
  {
    text: 'محصولات',
    to: '/products',
    icon: <ProductsIcon />,
  },
  {
    text: 'امنیت',
    to: '/security',
    icon: <SecurityIcon />,
  },
  {
    text: 'تنظیمات',
    to: '/settings',
    icon: <SettingsIcon />,
    items: [
      {
        text: 'تست',
      },
    ],
  },
  {
    text: 'سفارشات',
    to: '/orders',
    icon: <OrdersIcon />,
  },
  {
    text: 'دسته بندی ها',
    to: '/categories',
    icon: <CategoriesIcon />,
  },
  {
    text: 'تبلیغات',
    to: '/ads',
    icon: <AdsIcon />,
  },
  {
    text: 'بلاگ',
    to: '/blog',
    icon: <BlogIcon />,
  },
];

/**
 * @component NavigationDrawer
 */
function NavigationDrawer() {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useNavigationDrawerState();

  const renderDrawerContent = (
    <div className={classes.content}>
      <div className={classes.logoSection}>
        <LogoWithTitle />
      </div>

      <Divider variant="middle" light />

      <List className={classes.list}>
        {data.map((item, key) => {
          return <NavigationItemCore key={key} {...item} />;
        })}
      </List>

      <div className={classes.sideBarFooter}>
        <Avatar />
        <div className={classes.owner}>
          <ListItemText
            classes={{ secondary: classes.userBoxText }}
            primary={'محمدحسین علی پور'}
            secondary={'مدیر فروشگاه'}
          />
        </div>
      </div>
    </div>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.drawer}>
      <Hidden mdUp implementation="js">
        <Drawer
          elevation={2}
          variant="temporary"
          disablePortal
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {renderDrawerContent}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="js">
        <Drawer
          elevation={2}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {renderDrawerContent}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default NavigationDrawer;

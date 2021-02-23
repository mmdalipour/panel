import { makeStyles, Theme } from '@material-ui/core/styles';

// providers
import { useNavigationDrawerSetState } from 'providers/NavigationDrawerProvider';

// api
import { logout } from 'api/auth';

// components
import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import { DRAWER_WIDTH } from 'components/NavigationDrawer';
import LanguageSelect from 'components/LanguageSelect';
import Badge from '@material-ui/core/Badge';

// icons
import MenuIcon from 'components/shared/icons/Menu';
import ShutDownIcon from 'components/shared/icons/ShutDown';
import BellIcon from 'components/shared/icons/Bell';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    background: theme.palette.appBar.background,
    color: theme.palette.appBar.color,
  },
  toolbar: theme.mixins.toolbar,
  wrapper: {
    flex: 1,
  },
}));

export type AppBarProps = {};

/**
 * @component AppBar
 */
function AppBar() {
  const classes = useStyles();

  const setMobileOpen = useNavigationDrawerSetState();

  const onMenuClick = () => {
    setMobileOpen(true);
  };

  const onLogout = () => {
    logout();
  };

  return (
    <MuiAppBar className={classes.appBar} color="inherit">
      <Toolbar>
        <div className={classes.wrapper}>
          <Hidden mdUp implementation="js">
            <IconButton color="inherit" onClick={onMenuClick}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        </div>

        <LanguageSelect
          languages={[
            { code: 'fa', name: 'فارسی', flag: '/images/flags/ir.png' },
            { code: 'en', name: 'انگلیسی', flag: '/images/flags/us.png' },
          ]}
        />

        <Badge color="secondary" variant="dot" overlap="circle">
          <IconButton>
            <BellIcon />
          </IconButton>
        </Badge>

        <IconButton onClick={onLogout}>
          <ShutDownIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;

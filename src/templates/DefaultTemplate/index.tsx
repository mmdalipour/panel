import { ReactNode, useEffect, useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

// api
import { verifyAccessToken } from 'api/auth';

// libs
import withAuth from 'lib/withAuth';

// constants
import { SPACING, SPACING_HALF, SPACING_LEAST } from 'constants/spacing';

// components
import AppBar from 'components/AppBar';
import NavigationDrawer, { DRAWER_WIDTH } from 'components/NavigationDrawer';
import CookieNotification from 'components/CookieNotification';
import ThemeDrawer from 'components/ThemeDrawer';
import Fab from '@material-ui/core/Fab';

// icons
import ThemeIcon from 'components/shared/icons/Theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    padding: theme.spacing(SPACING, SPACING_HALF),
    height: '100%',
    // '&::-webkit-scrollbar': {
    //   width: '10px',
    //   height: '5px',
    // },
    // '&::-webkit-scrollbar-track': {
    //   background: theme.palette.background.tableHeadBackground,
    // },
    // '&::-webkit-scrollbar-thumb': {
    //   background: theme.palette.grey[500],
    //   borderRadius: theme.shape.borderRadius,
    // },

    [theme.breakpoints.down('md')]: {
      width: '100%',
      padding: theme.spacing(SPACING, SPACING_LEAST),
    },
  },
  themeButton: {
    position: 'fixed',
    bottom: theme.spacing(SPACING_HALF),
    right: theme.spacing(SPACING_HALF),
    zIndex: theme.zIndex.speedDial,
  },
}));

export type DefaultTemplateProps = {
  children?: ReactNode;
};

/**
 * @component DefaultTemplate
 */
function DefaultTemplate({ children }: DefaultTemplateProps) {
  const classes = useStyles();

  const [openThemeDrawer, setOpenThemeDrawer] = useState<boolean>(false);

  useEffect(() => {
    const checkToken = async () => {
      await verifyAccessToken();
    };

    checkToken();
  }, []);

  return (
    <div className={classes.root}>
      <CookieNotification />
      <AppBar />
      <NavigationDrawer />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.themeButton}>
          <Fab color="primary" onClick={() => setOpenThemeDrawer(true)}>
            <ThemeIcon color="inherit" />
          </Fab>
        </div>
        <ThemeDrawer
          open={openThemeDrawer}
          onClose={() => setOpenThemeDrawer(false)}
        />

        {children}
      </div>
    </div>
  );
}

export default withAuth<DefaultTemplateProps>(DefaultTemplate);

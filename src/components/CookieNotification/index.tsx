import { useState, useEffect } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import { getConsentCookie, setConsentCookie } from 'lib/Storage';

// constants
import { SPACING_HALF, SPACING_LEAST, SPACING_THIRD } from 'constants/spacing';

// components
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 420,
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: theme.spacing(SPACING_THIRD),
    outline: 'none',
    zIndex: 2000,
  },
  media: {
    padding: theme.spacing(SPACING_LEAST, SPACING_HALF),
    height: 180,
    textAlign: 'center',
    '& > img': {
      height: '100%',
      width: 'auto',
    },
  },
  content: {
    padding: theme.spacing(SPACING_LEAST, SPACING_HALF),
  },
  actions: {
    padding: theme.spacing(SPACING_HALF),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

/**
 * @component CookieNotification
 */
function CookieNotification() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setConsentCookie(true);
    setOpen(false);
  };

  useEffect(() => {
    const consent = getConsentCookie();

    if (!consent) {
      setOpen(true);
    }
  }, []);

  return (
    <Grow in={open} unmountOnExit>
      <Paper className={classes.root} variant="outlined">
        <div className={classes.media}>
          <img alt="Cookies" src="/images/undraw_cookie_love_ulvn.svg" />
        </div>
        <div className={classes.content}>
          <Typography variant="body1">
            ما برای اطمینان از اینکه شما بهترین تجربه را در وب سایت خود داریم از کوکی استفاده می کنیم. سیاست حفظ{' '}
            <Link className={classes.link} to="/privacy-policy" target="_blank">
              حریم خصوصی
            </Link>{' '}
            ما را بخوانید.
          </Typography>
        </div>
        <div className={classes.actions}>
          <Button color="primary" onClick={handleClose} variant="contained">
            موافقم
          </Button>
        </div>
      </Paper>
    </Grow>
  );
}

export default CookieNotification;

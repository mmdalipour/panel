import { makeStyles, Theme } from '@material-ui/core/styles';

// constants
import { getAppName } from 'constants/app';

// components
import Typography from '@material-ui/core/Typography';

// icons
import Logo from 'components/shared/icons/Logo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: 600,
  },
}));

/**
 * @component LogoWithTitle
 */
function LogoWithTitle() {
  const classes = useStyles();

  return (
    <div className={classes.root} dir="ltr">
      <Logo />
      <Typography color="inherit" variant="h4" className={classes.title}>
        {getAppName()}
      </Typography>
    </div>
  );
}

export default LogoWithTitle;

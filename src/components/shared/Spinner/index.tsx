import { makeStyles, Theme } from '@material-ui/core/styles';

// components
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '65vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

/**
 * @component Spinner
 */
function Spinner() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
}

export default Spinner;

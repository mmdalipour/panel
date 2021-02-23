import { makeStyles, Theme } from '@material-ui/core/styles';

// components
import Bar from 'components/Charts/Bar';
import PaperWithTitle from 'components/PaperWithTitle';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 300,
    width: '100%',
    [theme.breakpoints.down('md')]: {
      height: 200,
    },
  },
}));
/**
 * @component CustomerGrowth
 */
function CustomerGrowth() {
  const classes = useStyles();

  return (
    <PaperWithTitle title="رشد مشتری">
      <div className={classes.root}>
        <Bar />
      </div>
    </PaperWithTitle>
  );
}

export default CustomerGrowth;

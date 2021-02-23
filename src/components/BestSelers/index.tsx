import { makeStyles, Theme } from '@material-ui/core/styles';

// components
import Doughnut from 'components/Charts/Doughnut';
import PaperWithTitle from 'components/PaperWithTitle';

// chartData
import data from './data';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 300,
    [theme.breakpoints.down('md')]: {
      height: 250,
    },
  },
}));

/**
 * @component BestSelers
 */
function BestSelers() {
  const classes = useStyles();

  return (
    <PaperWithTitle title="محصولات پرفروش برحسب دسته بندی">
      <div className={classes.root}>
        <Doughnut />
      </div>
    </PaperWithTitle>
  );
}

export default BestSelers;

import { makeStyles, Theme } from '@material-ui/core/styles';

// components
import Line from 'components/Charts/Line';
import PaperWithTitle from 'components/PaperWithTitle';
import ExportButton from 'components/ExportButton';

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
 * @component SalesReport
 */
function SalesReport() {
  const classes = useStyles();

  return (
    <PaperWithTitle title="گزارش فروش" headerChildren={<ExportButton data={[]} />}>
      <div className={classes.root}>
        <Line />
      </div>
    </PaperWithTitle>
  );
}

export default SalesReport;

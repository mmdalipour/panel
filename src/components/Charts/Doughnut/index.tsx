import { useTheme, fade } from '@material-ui/core/styles';

import { Doughnut as DoughnutChart } from 'react-chartjs-2';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { SPACING_LEAST } from 'constants/spacing';

// components
import Typography from '@material-ui/core/Typography';

export type DoughnutProps = {};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  legendContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    justifyContent: 'space-around',
  },
  categoryContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  legend: {
    borderRadius: theme.shape.borderRadius,
    width: 12,
    height: 12,
    marginRight: theme.spacing(SPACING_LEAST),
  },
  legendLabel: {
    flex: 1,
  },
  percentage: {
    fontWeight: 'bold',
  },
}));

const calculatePercentage = (a: number, total: number): number => {
  return Math.floor((a * 100) / total);
};

function Doughnut({}: DoughnutProps) {
  const classes = useStyles();

  const theme = useTheme();

  const chartData = {
    labels: ['دسته بندی 1', 'دسته بندی 2', 'دسته بندی 3', 'دسته بندی 4'],
    datasets: [
      {
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          '#F99600',
        ],
        data: [250, 120, 150, 170],
      },
    ],
  };

  return (
    <div className={classes.root}>
      <DoughnutChart
        data={chartData}
        options={{
          maintainAspectRatio: false,
          cutoutPercentage: 90,
          responsive: false,
          legend: {
            display: false,
          },
        }}
      />

      <div className={classes.legendContainer}>
        {chartData.labels.map((label, key) => {
          const dataset = chartData.datasets[0];
          return (
            <div className={classes.categoryContainer}>
              <div
                style={{ background: dataset.backgroundColor[key] }}
                className={classes.legend}
              ></div>

              <Typography className={classes.legendLabel}>{label}</Typography>

              <Typography className={classes.percentage}>
                {calculatePercentage(
                  dataset.data[key],
                  dataset.data.reduce((a, b) => a + b, 0)
                )}
                %
              </Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Doughnut;

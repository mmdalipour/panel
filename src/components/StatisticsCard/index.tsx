import { fade, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// components
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// constants
import { SPACING_HALF, SPACING_LEAST } from 'constants/spacing';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      height: 225,
      transition: theme.transitions.create(['transform']),
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    paperBody: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: theme.spacing(SPACING_HALF),
    },
    time: {
      background: theme.palette.primary.main,
      boxShadow: theme.shadows[1],
      borderRadius: 15,
      padding: theme.spacing(0, SPACING_LEAST),
      width: 'fit-content',
      color: theme.palette.primary.contrastText,
      margin: 'auto',
    },
    value: ({
      data,
      usePercentage,
      percentage,
    }: Pick<StatisticsCardProps, 'data' | 'usePercentage' | 'percentage'>) => {
      return {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: usePercentage
          ? percentage <= 0
            ? theme.palette.error.main
            : theme.palette.success.main
          : theme.palette.text.primary,
      };
    },
    percentage: ({
      data,
      usePercentage,
      percentage,
    }: Pick<StatisticsCardProps, 'data' | 'usePercentage' | 'percentage'>) => {
      return {
        background: fade(
          percentage <= 0 ? theme.palette.error.main : theme.palette.success.main,
          0.05
        ),
        boxShadow: theme.shadows[1],
        borderRadius: 15,
        padding: theme.spacing(0, SPACING_HALF),
        width: 'fit-content',
        color:
          percentage <= 0 ? theme.palette.error.main : theme.palette.success.main,
        margin: 'auto',
      };
    },
    prevMonth: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    percentageText: {
      fontWeight: 'bold',
    },
    dateHint: {
      marginTop: theme.spacing(SPACING_LEAST),
    },
  };
});

export type StatisticsCardProps = {
  title: string;
  dataFor?: 'هفتگی' | 'ماهانه' | 'سالانه';
  usePercentage?: boolean;
  data: number;
  percentage: number;
} & PaperProps;

const addSign = (a: number): string => {
  return `${a <= 0 ? '' : '+'}${a}`;
};

/**
 * @component StatisticsCard
 */
function StatisticsCard({
  className,
  title,
  dataFor,
  usePercentage,
  percentage,
  data,
  ...rest
}: StatisticsCardProps) {
  const classes = useStyles({ data, usePercentage, percentage });

  const rootClasses = clsx(classes.root, className);

  return (
    <Paper className={rootClasses} {...rest}>
      <div className={classes.paperBody}>
        <div style={{ width: '100%' }}>
          <Typography gutterBottom align="center">
            {title}
          </Typography>
          <div className={classes.time}>
            <Typography variant="overline" color="inherit">
              {dataFor}
            </Typography>
          </div>
        </div>

        <div className={classes.value}>
          <Typography variant="h4">
            {usePercentage ? addSign(data) : data}
          </Typography>
        </div>

        <div className={classes.prevMonth}>
          <div className={classes.percentage}>
            <Typography className={classes.percentageText} color="inherit">
              {`%${addSign(percentage)}`}
            </Typography>
          </div>
          <Typography
            variant="overline"
            className={classes.dateHint}
            color="textSecondary"
          >
            نسبت به ماه گذشته
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default StatisticsCard;

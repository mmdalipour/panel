import { fade, makeStyles, Theme } from '@material-ui/core/styles';

// constants
import { SPACING_HALF, SPACING_LEAST } from 'constants/spacing';

// components
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: ({ type, variant, size }: Pick<StatusChipProps, 'type' | 'variant' | 'size'>) => {
    const getColor = () => {
      switch (type) {
        case 'error':
          return theme.palette.error.main;
        case 'warning':
          return theme.palette.warning.main;
        case 'success':
          return theme.palette.success.main;
        default:
          return theme.palette.success.main;
      }
    };

    const isSmall = size === 'small';

    return {
      padding: isSmall ? theme.spacing(SPACING_LEAST / 2, SPACING_LEAST) : theme.spacing(SPACING_LEAST, SPACING_HALF),
      borderRadius: 25,
      background: variant === 'contained' ? fade(getColor(), 0.05) : 'none',
      color: getColor(),
    };
  },
}));

export type StatusChipProps = {
  type?: 'error' | 'warning' | 'success';
  text: string;
  variant?: 'contained' | 'text';
  size?: 'small' | 'medium';
};

/**
 * @component StatusChip
 */
function StatusChip({ type = 'success', size = 'medium', text, variant = 'contained' }: StatusChipProps) {
  const classes = useStyles({ type, variant, size });

  return (
    <Typography className={classes.root} align="center" variant="caption">
      {text}
    </Typography>
  );
}

export default StatusChip;

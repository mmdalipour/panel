import { ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

// components
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// constants
import { SPACING_HALF, SPACING_LEAST } from 'constants/spacing';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(SPACING_LEAST, 'auto'),
  },
  paperBody: {
    padding: theme.spacing(SPACING_HALF),
  },
}));

export type PaperWraperProps = {
  children: ReactNode;
  title?: string;
};

/**
 * @component PaperWraper
 */
function PaperWraper({ children, title }: PaperWraperProps) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper>
        <div className={classes.paperBody}>
          <Typography variant="h6">{title}</Typography>
          {children}
        </div>
      </Paper>
    </div>
  );
}

export default PaperWraper;

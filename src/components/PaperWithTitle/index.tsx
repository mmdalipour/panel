import { ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import clsx from 'clsx';

// constants
import { SPACING, SPACING_HALF } from 'constants/spacing';

// components
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  container: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(SPACING),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(SPACING_HALF),
    },
  },
  paperBody: {
    display: 'flex',
    marginBottom: theme.spacing(SPACING_HALF),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export type PaperWithTitleProps = {
  title: string;
  children?: ReactNode;
  headerChildren?: ReactNode;
} & PaperProps;

/**
 * @component PaperWithTitle
 */
function PaperWithTitle({
  title,
  children,
  headerChildren,
  className,
  ...rest
}: PaperWithTitleProps) {
  const classes = useStyles();

  const rootClasses = clsx(classes.root, className);
  return (
    <Paper elevation={1} className={rootClasses} {...rest}>
      <div className={classes.container}>
        <div className={classes.paperBody}>
          <Typography variant="body1" component="h2" gutterBottom>
            {title}
          </Typography>
          {headerChildren}
        </div>
        {children}
      </div>
    </Paper>
  );
}

export default PaperWithTitle;

import { ReactNode } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

// constants
import { SPACING_HALF } from 'constants/spacing';

// components
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    margin: theme.spacing(SPACING_HALF, 0),
  },
}));

export type PageTitleProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  renderAction?: () => ReactNode;
};

/**
 * @component PageTitle
 */
function PageWithTitle({ title, renderAction = () => null, subtitle, children }: PageTitleProps) {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <div className={classes.titleWrapper}>
          <div>
            <Typography gutterBottom variant="h3">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </div>

          <div>{renderAction()}</div>
        </div>

        <div className={classes.divider}>
          <Divider />
        </div>

        {children}
      </div>
    </Container>
  );
}

export default PageWithTitle;

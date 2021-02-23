import { useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

// constants
import { SPACING_HALF } from 'constants/spacing';

// components
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(SPACING_HALF),
    background: theme.palette.background.paper,
  },
  arrow: {
    position: 'absolute',
    fontSize: '7px',
    width: '3em',
    height: '3em',
  },
  transitionContainer: {},
  popper: {
    '&[x-placement*="bottom"] $transitionContainer $arrow': {
      width: '0',
      height: '0',
      borderLeft: '1em solid transparent',
      borderRight: '1em solid transparent',
      borderBottom: `1em solid ${theme.palette.background.paper}`,
      marginTop: '-0.9em',
    },
    '&[x-placement*="top"] $transitionContainer $arrow': {
      bottom: '0',
      width: '0',
      height: '0',
      borderLeft: '1em solid transparent',
      borderRight: '1em solid transparent',
      borderTop: `1em solid ${theme.palette.background.paper}`,
      marginBottom: '-0.9em',
    },
    '&[x-placement*="left"] $transitionContainer $arrow': {
      right: '0',
      width: '0',
      height: '0',
      borderTop: '1em solid transparent',
      borderBottom: '1em solid transparent',
      borderLeft: `1em solid ${theme.palette.background.paper}`,
      marginRight: '-0.9em',
    },
    '&[x-placement*="right"] $transitionContainer $arrow': {
      left: '0',
      width: '0',
      height: '0',
      borderTop: '1em solid transparent',
      borderBottom: '1em solid transparent',
      borderRight: `1em solid ${theme.palette.background.paper}`,
      marginLeft: '-0.9em',
    },
  },
}));

export type TextWithPopperProps = {
  text: string;
  disablePopper?: boolean;
} & TypographyProps;

/**
 * @component TextWithPopper
 */
function TextWithPopper({ text, disablePopper, children, ...rest }: TextWithPopperProps) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [arrowEl, setArrowEl] = useState<null | HTMLElement>(null);

  const onEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onLeave = () => {
    setAnchorEl(null);
  };

  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <Typography {...rest}>{text}</Typography>
      {!disablePopper && (
        <Popper
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          className={classes.popper}
          placement="bottom"
          disablePortal={true}
          transition
          modifiers={{
            arrow: {
              enabled: true,
              element: arrowEl,
            },
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <div className={classes.transitionContainer}>
                <span className={classes.arrow} ref={setArrowEl} />
                <Paper elevation={1} className={classes.paper}>
                  {children}
                </Paper>
              </div>
            </Fade>
          )}
        </Popper>
      )}
    </div>
  );
}

export default TextWithPopper;

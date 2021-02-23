import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

// constants
import { SPACING_LEAST } from 'constants/spacing';

// components
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  button: ({
    primaryColor,
    secondaryColor,
  }: Pick<ThemeButtonProps, 'primaryColor' | 'secondaryColor'>) => ({
    width: 50,
    height: 50,
    background: secondaryColor
      ? `linear-gradient(-45deg, ${primaryColor} 50%,${secondaryColor} 0px)`
      : primaryColor,
    borderRadius: '50%',
    boxShadow:
      theme.palette.type === 'dark'
        ? `${theme.palette.divider} 0px 0px 0px 1px`
        : 'none',
  }),
  buttonContainer: ({
    selected,
  }: Pick<ThemeButtonProps, 'primaryColor' | 'secondaryColor' | 'selected'>) => {
    return {
      height: 80,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `1px solid ${
        selected ? theme.palette.primary.main : theme.palette.divider
      }`,
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(SPACING_LEAST),
    };
  },
}));

export type ThemeButtonProps = {
  primaryColor: string;
  secondaryColor?: string;
  name?: string;
  selected?: boolean;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * @component ThemeButton
 */
function ThemeButton({
  className,
  primaryColor,
  secondaryColor,
  name,
  selected,
  ...rest
}: ThemeButtonProps) {
  const classes = useStyles({ primaryColor, secondaryColor, selected });

  const rootClasses = clsx(classes.root, className);

  return (
    <div className={rootClasses} {...rest}>
      <div className={classes.buttonContainer}>
        <div className={classes.button}></div>
      </div>
      <Typography align="center" variant="body2" color="textPrimary">
        {name}
      </Typography>
    </div>
  );
}

export default ThemeButton;

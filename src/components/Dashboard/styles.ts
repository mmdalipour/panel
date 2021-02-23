import { makeStyles, Theme } from '@material-ui/core/styles';
// constants
import { SPACING, SPACING_HALF, SPACING_LEAST } from 'constants/spacing';

export default makeStyles((theme: Theme) => {
  const gridGap = theme.spacing(SPACING_HALF);
  return {
    root: {
      width: '100%',
    },
    statisticsCardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      rowGap: `${gridGap}px`,
      columnGap: `${gridGap}px`,
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
      },
      marginBottom: theme.spacing(SPACING),
    },
    card: {
      [theme.breakpoints.down('md')]: {
        '&:last-child': {
          gridColumn: '1/span 2',
        },
      },
      [theme.breakpoints.down('sm')]: {
        '&:last-child': {
          gridColumn: 'auto',
        },
      },
    },
    monthWrapper: {
      display: 'flex',
      height: '100%',
      '& > *': {
        margin: theme.spacing(0, SPACING_LEAST / 2),
      },
    },

    chartsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      rowGap: `${gridGap}px`,
      columnGap: `${gridGap}px`,
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
    },

    gridCell: {
      height: '100%',
      '& > *': {
        height: '100%',
      },
      '&:nth-child(1)': {
        gridColumn: 1,
        gridColumnEnd: 3,
        [theme.breakpoints.down('md')]: {
          gridColumn: 1,
          gridColumnEnd: 6,
        },
      },
      '&:nth-child(2)': {
        gridColumnStart: 3,
        gridColumnEnd: 6,
        [theme.breakpoints.down('md')]: {
          gridColumn: 1,
          gridColumnEnd: 6,
        },
      },
      '&:nth-child(3)': {
        gridColumnStart: 1,
        gridColumnEnd: 6,
        [theme.breakpoints.down('md')]: {
          order: 4,
        },
      },
      '&:nth-child(4)': {
        gridColumn: 1,
        gridColumnEnd: 3,
        [theme.breakpoints.down('md')]: {
          gridColumn: 1,
          gridColumnEnd: 6,
          order: 3,
        },
      },
      '&:nth-child(5)': {
        gridColumnStart: 3,
        gridColumnEnd: 6,
        [theme.breakpoints.down('md')]: {
          gridColumn: 1,
          gridColumnEnd: 6,
        },
      },
    },
  };
});

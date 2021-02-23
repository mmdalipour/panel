import { makeStyles, Theme } from '@material-ui/core';

// components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// constants
import { SPACING_HALF, SPACING_LEAST } from 'constants/spacing';

// assets
import NoImage from 'assets/images/NoImage.svg';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifySelf: 'center',
    alignItems: 'center',
    margin: theme.spacing(SPACING_HALF, 'auto'),
  },
  selectSection: {
    marginTop: theme.spacing(SPACING_LEAST),
  },
  image: {
    width: 130,
  },
}));

/**
 * @component SelectImage
 */
function SelectImage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={NoImage} alt="no pic" className={classes.image} />

      <Typography variant="body1" color="textSecondary" gutterBottom>
        عکسی پیدا نشد
      </Typography>
      <div className={classes.selectSection}>
        <input style={{ display: 'none' }} accept="image/*" id="raised-button-file" multiple type="file" />{' '}
        <label htmlFor="raised-button-file">
          <Button variant="contained" color="primary" component="span">
            انتخاب عکس
          </Button>
        </label>
      </div>
    </div>
  );
}

export default SelectImage;

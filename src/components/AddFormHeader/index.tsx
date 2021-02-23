// components
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LoadingButton from 'components/shared/LoadingButton';

// constants
import { SPACING_LEAST } from 'constants/spacing';

// icons
import RightArrow from 'components/shared/icons/RightArrow';

// hooks
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backSection: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginLeft: theme.spacing(SPACING_LEAST),
  },
}));

export type AddFormHeaderProps = {
  title: string;
  onSubmit?: () => unknown;
  isLoading?: boolean;
};

/**
 * @component AddFormHeader
 */
function AddFormHeader({ title, onSubmit = () => {}, isLoading }: AddFormHeaderProps) {
  const history = useHistory();
  const classes = useStyles();

  const onBackHandler = () => {
    history.goBack();
  };
  const onSubmitHandler = () => {
    onSubmit();
  };

  return (
    <div className={classes.root}>
      <div className={classes.backSection}>
        <IconButton color="default" onClick={onBackHandler}>
          <RightArrow fontSize="small" color="secondary" />
        </IconButton>
        <div className={classes.title}>
          <Typography variant="subtitle1">{title}</Typography>
        </div>
      </div>
      <LoadingButton
        loading={isLoading}
        onClick={onSubmitHandler}
        variant="contained"
        size="small"
        color="primary"
      >
        ثبت
      </LoadingButton>
    </div>
  );
}

export default AddFormHeader;

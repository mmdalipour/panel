import { makeStyles, Theme } from '@material-ui/core/styles';

// components
import PaperWraper from 'components/PaperWraper';
import SelectImage from 'components/SelectImage';
import Select from 'components/shared/Select';
import AddFormHeader from 'components/AddFormHeader';
import Input from 'components/shared/Input';
import Container from '@material-ui/core/Container';

// constants
import { SPACING_LEAST } from 'constants/spacing';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(SPACING_LEAST, 'auto'),
  },
  input: {
    margin: theme.spacing(SPACING_LEAST, '0'),
    width: '48%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

/**
 * @component AddCategory
 */
function AddCategory() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <AddFormHeader title="افزودن دسته بندی" />
      <div className={classes.root}>
        <PaperWraper title="اطلاعات کلی">
          <div className={classes.input}>
            <Input size="small" placeholder="عنوان دسته بندی" />
          </div>
          <div className={classes.input}>
            <Select label="والد" options={[]} />
          </div>
        </PaperWraper>
      </div>
      <PaperWraper title="تصاویر دسته بندی">
        <SelectImage />
      </PaperWraper>
    </Container>
  );
}

export default AddCategory;

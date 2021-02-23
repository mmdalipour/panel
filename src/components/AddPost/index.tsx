import { makeStyles, Theme } from '@material-ui/core';

// components
import PaperWraper from 'components/PaperWraper';
import Input from 'components/shared/Input';
import RichEditor from 'components/RichEditor';
import AddFormHeader from 'components/AddFormHeader';
import Container from '@material-ui/core/Container';

// constants
import { SPACING_LEAST } from 'constants/spacing';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    margin: theme.spacing(SPACING_LEAST, '0'),
    width: '45%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

/**
 * @component AddPost
 */
function AddPost() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <AddFormHeader title="افزودن پست" />
      <PaperWraper title="اطلاعات کلی">
        <div className={classes.input}>
          <Input size="small" placeholder="عنوان پست" />
        </div>
      </PaperWraper>

      <PaperWraper>
        <RichEditor placeholder="تایپ کنید..." />
      </PaperWraper>
    </Container>
  );
}

export default AddPost;

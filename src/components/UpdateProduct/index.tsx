import { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

// components
import SelectBrand from 'components/SelectBrand';
import SelectCategory from 'components/SelectCategory';
import Spinner from 'components/shared/Spinner';
import AddFormHeader from 'components/AddFormHeader';
import RichEditor from 'components/RichEditor';
import DatePicker from 'components/DatePicker';
import SelectImage from 'components/SelectImage';
import PaperWraper from 'components/PaperWraper';
import Input from 'components/shared/Input';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// constants
import { SPACING_HALF } from 'constants/spacing';

// hooks
import { useProduct } from 'hooks/product';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  inputsSection: {
    width: '100%',
    margin: theme.spacing(SPACING_HALF, '0'),
  },
  specialOffers: {
    width: '100%',
    marginTop: theme.spacing(SPACING_HALF),
  },
  specificsSection: {
    margin: theme.spacing(SPACING_HALF, '0'),
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

/**
 * @component UpdateProduct
 */
function UpdateProduct() {
  const classes = useStyles();
  const { id: code }: { id: string } = useParams();

  // get product by code
  const { data, isLoading } = useProduct(Number(code));
  const product = data?.data;

  // formData
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [remainingNumber, setRemainingNumber] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string>('');

  useEffect(() => {
    setTitle(product?.title as string);
    setPrice(product?.price as number);
    setRemainingNumber(product?.remainingNumber as number);
    setCategory(product?.category.id as string);
    setBrand(product?.brand.id as string);
  }, [product]);

  // checkBoxState
  const [state, setState] = useState({
    specialOffer: false,
    question: false,
    comments: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // const formData = { title, price, remainingNumber, category, brand };

  if (isLoading) return <Spinner />;

  return (
    <Container maxWidth="xl">
      {/* Start Form Header */}
      <form>
        <AddFormHeader title="ویرایش محصول" />
        {/* End of Form Header */}

        {/*Start of General information */}
        <PaperWraper title="اطلاعات کلی">
          <div className={classes.inputsSection}>
            <Grid container spacing={SPACING_HALF}>
              <Grid item xs={12} md={6}>
                <Input
                  size="small"
                  placeholder="نام محصول"
                  type="text"
                  value={title}
                  onChange={(text) => setTitle(text as string)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <SelectBrand value={brand} setValue={setBrand} label={product?.brand.name} />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={SPACING_HALF}>
                  <Grid item xs={12} md={6}>
                    <Input
                      size="small"
                      value={price}
                      onChange={(num) => setPrice(Number(num))}
                      placeholder="قیمت"
                      endAdornment={
                        <Typography variant="overline" color="textSecondary">
                          ريال
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={SPACING_HALF}>
                  <Grid item xs={12} md={6}>
                    <Input
                      size="small"
                      value={remainingNumber}
                      onChange={(num) => setRemainingNumber(Number(num))}
                      placeholder="تعداد"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={SPACING_HALF}>
                  <Grid item xs={12} md={6}>
                    <SelectCategory
                      value={category}
                      setValue={setCategory}
                      label={product?.category.name}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </PaperWraper>
        {/* end of General information */}
        {/* start of Special Offer  */}
        <PaperWraper title="پیشنهاد ویژه">
          <div className={classes.inputsSection}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  color="primary"
                  checked={state.specialOffer}
                  onChange={handleChange}
                  name="specialOffer"
                />
              }
              label="پیشنهاد ویژه"
            />
            <Fade unmountOnExit appear={false} in={state.specialOffer}>
              <div className={classes.specialOffers}>
                <Grid container spacing={SPACING_HALF} style={{ width: '100%' }}>
                  <Grid item xs={12} md={6} lg={6}>
                    <DatePicker label="انتخاب تاریخ" />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}></Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Input
                      size="small"
                      placeholder="درصد تخفیف"
                      endAdornment={<Typography color="textSecondary">%</Typography>}
                    />
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </div>
        </PaperWraper>
        {/* end of Special Offer  */}

        {/* start of Product Image  */}
        <PaperWraper title="تصاویر محصول">
          <SelectImage />
        </PaperWraper>
        {/* end of Product Image  */}

        {/* start of Review */}
        <PaperWraper title="نقد و بررسی">
          <div className={classes.inputsSection}>
            <RichEditor placeholder="این محصول را شرح دهید..." />
          </div>
        </PaperWraper>
        {/* end of Review */}

        {/* start of EnabelComments */}
        <PaperWraper title="نظرات کاربران">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="primary"
                checked={state.comments}
                onChange={handleChange}
                name="comments"
              />
            }
            label="فعال کردن بخش نظرات"
          />
        </PaperWraper>
        {/* end of EnabelComments */}

        {/* start of Enable Question&Answers */}
        <PaperWraper title="پرسش و پاسخ">
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                color="primary"
                checked={state.question}
                onChange={handleChange}
                name="question"
              />
            }
            label="فعال کردن بخش پرسش و پاسخ "
          />
        </PaperWraper>
        {/* end of Enable Question&Answers */}
        <PaperWraper title="مشخصات">
          <div className={classes.specificsSection}>
            <Grid container spacing={SPACING_HALF}>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="caption">
                  مشخصات کلی
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="ابعاد" />
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="توضیحات سیم کارت" />
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="وزن" />
              </Grid>
            </Grid>
          </div>
          <div className={classes.specificsSection}>
            <Grid container spacing={SPACING_HALF}>
              <Grid item xs={12}>
                <Typography color="textSecondary" variant="caption">
                  حافظه
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="حافظه داخلی" />
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="پشتیبانی از کارت حافظه جانبی" />
              </Grid>
              <Grid item xs={12}>
                <Input size="small" placeholder="پشتیبانی از کارت حافظه جانبی" />
              </Grid>
            </Grid>
          </div>
        </PaperWraper>
      </form>
    </Container>
  );
}
export default UpdateProduct;

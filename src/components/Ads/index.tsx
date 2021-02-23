import { makeStyles, Theme } from '@material-ui/core/styles';
import { Banner } from 'api/banner';

// components
import BannerCard from './BannerCard';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

// constants
import { SPACING_HALF, SPACING_DOUBLE, SPACING } from 'constants/spacing';

// icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// hooks
import { useAllBanners } from 'hooks/banner';

const useStyles = makeStyles((theme: Theme) => ({
  addButton: {
    padding: theme.spacing(SPACING_DOUBLE, SPACING * 3),
  },
  title: {
    marginBottom: theme.spacing(SPACING_HALF),
  },
  bannersSection: {
    margin: theme.spacing(SPACING_HALF, 'auto'),
  },
}));

/**
 * @component Ads
 */
function Ads() {
  const classes = useStyles();
  const { data, isLoading } = useAllBanners();
  const banners = data?.data;
  const bannerSkelet = [1, 2, 3, 4, 5, 6, 7, 8];

  const renderBanner = () =>
    isLoading ? (
      <Grid container spacing={SPACING_HALF}>
        {bannerSkelet.map((sk: number) => (
          <Grid item xs={12} md={3} key={sk}>
            <Skeleton
              style={{ borderRadius: 8 }}
              variant="rect"
              width="100%"
              height={160}
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      banners?.map((banner: Banner) => (
        <Grid item xs={12} md={3} key={banner._id}>
          <BannerCard thumbnail={banner.thumbnail} name={banner.name} />
        </Grid>
      ))
    );

  return (
    <Container maxWidth="xl">
      <div className={classes.title}>
        <Typography variant="h6" component="h1">
          بنرها
        </Typography>
      </div>
      <Divider />
      <div className={classes.bannersSection}>
        <Grid container spacing={SPACING_HALF}>
          {renderBanner()}

          <Grid item xs={12} md={3}>
            <Button className={classes.addButton} variant="outlined">
              <AddCircleOutlineIcon fontSize="large" color="secondary" />
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Ads;

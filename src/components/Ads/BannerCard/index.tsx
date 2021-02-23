import { makeStyles, Theme } from '@material-ui/core/styles';
import { useState } from 'react';

// components
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';

// constants
import { SPACING_LEAST, BORDER_RADIUS } from 'constants/spacing';

// icons
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme: Theme) => ({
  adsCard: {
    marginRight: theme.spacing(SPACING_LEAST),
    borderRadius: BORDER_RADIUS,
    height: 160,
  },
  cardMedia: {
    borderRadius: BORDER_RADIUS,
    backgroundPosition: 'top',
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  actions: {
    display: 'flex',
    position: 'absolute',
    bottom: '0',
    right: '0',
  },
}));

export type BannerCardProps = {
  thumbnail: string;
  name: string;
};

/**
 * @component BannerCard
 */
function BannerCard({ thumbnail, name }: BannerCardProps) {
  const [actions, showActions] = useState(false);
  const classes = useStyles();

  return (
    <CardActionArea
      disableRipple
      className={classes.adsCard}
      onMouseOver={() => showActions(true)}
      onMouseLeave={() => showActions(false)}
    >
      <img className={classes.cardMedia} src={thumbnail} alt={name} />
      <Fade in={actions}>
        <div className={classes.actions}>
          <IconButton>
            <Delete fontSize="small" />
          </IconButton>
          <IconButton>
            <Edit fontSize="small" />
          </IconButton>
        </div>
      </Fade>
    </CardActionArea>
  );
}

export default BannerCard;

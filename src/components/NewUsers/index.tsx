import { makeStyles, Theme } from '@material-ui/core/styles';
import { User } from 'api/user';
import { Link } from 'react-router-dom';

// components
import UserWithAvatar from 'components/UserWithAvatar';
import PaperWithTitle from 'components/PaperWithTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

// constants
import { SPACING_LEAST, SPACING_THIRD } from 'constants/spacing';

// icons
import Message from 'components/shared/icons/Message';

// hooks
import { useAllUsers } from 'hooks/user';

const useStyles = makeStyles((theme: Theme) => ({
  skeletonSection: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(SPACING_THIRD),
  },
  skeletionText: {
    width: '100%',
    marginLeft: theme.spacing(SPACING_LEAST),
  },
  newUserSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  seeMore: {
    marginTop: theme.spacing(SPACING_LEAST),
    marginLeft: theme.spacing(SPACING_LEAST),
  },
}));

function NewUsers() {
  const { data, isLoading } = useAllUsers();
  const users = data?.data?.slice(0, 4);
  const skelet = [1, 2, 3, 4];

  const classes = useStyles();
  return (
    <PaperWithTitle title="کاربران جدید">
      {isLoading
        ? skelet.map((index) => (
            <div key={index} className={classes.skeletonSection}>
              <Skeleton animation="wave" variant="circle" width={54} height={45} />
              <div className={classes.skeletionText}>
                <Skeleton animation="wave" variant="text" width="90%" />
                <Skeleton animation="wave" variant="text" width="60%" />
              </div>
            </div>
          ))
        : users?.map((user: User) => (
            <div key={user._id} className={classes.newUserSection}>
              <UserWithAvatar
                id={user._id}
                username={user.fullName}
                avatar={user.avatar}
              />
              <IconButton>
                <Message color="secondary" fontSize="small" />
              </IconButton>
            </div>
          ))}
      <Divider variant="middle" />
      <div className={classes.seeMore}>
        <Typography component={Link} variant="caption" to="/users" color="primary">
          مشاهده بیشتر
        </Typography>
      </div>
    </PaperWithTitle>
  );
}

export default NewUsers;

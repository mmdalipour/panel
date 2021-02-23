import { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

// react-hook-form
import { useForm } from 'react-hook-form';

// react-router-dom
import { useHistory } from 'react-router-dom';

// api
import { login } from 'api/auth';

// lib
import { setAuthCookie, getAuthCookie } from 'lib/Storage';

// notistack
import { useSnackbar } from 'notistack';

// components
import Input from 'components/shared/Input';
import LogoWithTitle from 'components/LogoWithTitle';
import Typography from '@material-ui/core/Typography';
import LoadingButton from 'components/shared/LoadingButton';

import IconButton from '@material-ui/core/IconButton';
// constatns
import { SPACING_HALF } from 'constants/spacing';
// icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
  },
  form: {
    width: '426px',
    height: '436px',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.paper,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0.7',
  },
  inputsSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1.3,
    width: '100%',
    padding: theme.spacing(SPACING_HALF),
  },
  input: {
    marginTop: theme.spacing(SPACING_HALF),
  },
  button: {
    marginTop: theme.spacing(SPACING_HALF + 2),
  },
}));

type AuthForm = {
  email: string;
  password: string;
};

/**
 * @component Auth
 */
function Auth() {
  const classes = useStyles();
  const history = useHistory();

  const { register, handleSubmit } = useForm<AuthForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const [visable, setVisable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onVisable = () => {
    setVisable((prevState) => !prevState);
  };

  const onSubmit = async ({ email, password }: AuthForm) => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await login(email, password);

      if (data?.accessToken) {
        setAuthCookie({ ...data });
        setLoading(false);
        history.push('/');
      }
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  if (!!getAuthCookie()?.accessToken) history.push('/');

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.logo}>
          <LogoWithTitle />
        </div>
        <div className={classes.inputsSection}>
          <div>
            <Typography gutterBottom>ایمیل</Typography>
            <Input name="email" inputRef={register} />
          </div>
          <div className={classes.input}>
            <Typography gutterBottom>پسورد</Typography>
            <Input
              name="password"
              inputRef={register}
              type={visable ? 'text' : 'password'}
              endAdornment={
                <IconButton size="small" onClick={onVisable}>
                  {visable ? (
                    <VisibilityOffIcon color="secondary" />
                  ) : (
                    <VisibilityIcon color="secondary" />
                  )}
                </IconButton>
              }
            />
          </div>
          <div className={classes.button}>
            <LoadingButton
              loading={loading}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              size="large"
            >
              ورود
            </LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Auth;

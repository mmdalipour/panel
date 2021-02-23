// components
import Button, { ButtonProps } from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

export type LoadingButtonProps = { loading?: boolean } & ButtonProps;

/**
 * @component LoadingButton
 */
function LoadingButton({ loading, disabled, children, ...rest }: LoadingButtonProps) {
  return (
    <Button disabled={disabled || loading} {...rest}>
      {loading ? <CircularProgress size={24} /> : <Typography variant="button">{children}</Typography>}
    </Button>
  );
}

export default LoadingButton;

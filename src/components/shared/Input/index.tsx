import { useState, ChangeEvent, useEffect, ReactNode } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

// constants
import { SPACING_LEAST } from 'constants/spacing';
// components
import Paper from '@material-ui/core/Paper';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
// icons
export type InputProps = {
  value?: string | number;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  size?: 'medium' | 'small';
  onChange?: (value: string | number) => void;
} & Omit<InputBaseProps, 'onChange'>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus': {},
  },
}));

/**
 * @component Input
 * @summary shared Input
 */
function Input({ value, startAdornment, size = 'medium', endAdornment, onChange = () => {}, ...rest }: InputProps) {
  const classes = useStyles();

  const [_value, setValue] = useState(value);
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(value === 0 ? '' : value);
  }, [value]);

  return (
    <Paper elevation={0} variant="outlined">
      <Box display="flex" padding={size === 'small' ? SPACING_LEAST / 2 : SPACING_LEAST} alignItems="center" width="100%">
        {startAdornment}
        <Box flex={1} ml={SPACING_LEAST}>
          <InputBase inputProps={{ className: classes.root }} value={_value} onChange={onValueChange} fullWidth {...rest} />
        </Box>
        {endAdornment}
      </Box>
    </Paper>
  );
}

export default Input;

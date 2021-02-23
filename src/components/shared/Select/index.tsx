import { useState, useEffect, MouseEvent } from 'react';
import { useTheme, withStyles, makeStyles, Theme } from '@material-ui/core/styles';

// components
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';

// icons
import DownArrow from '../icons/DownArrow';

// constants
import { SPACING_LEAST } from 'constants/spacing';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  baseButton: {
    width: '100%',
    padding: theme.spacing(SPACING_LEAST),
  },
  name: {
    width: '100%',
  },
}));

const StyledMenu = withStyles(() => ({
  paper: {
    width: '32%',
    marginTop: 50,
    direction: 'ltr',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxHeight: 256,
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      //background: theme.palette.background.tableHeadBackground,
    },
    '&::-webkit-scrollbar-thumb': {
      //background: theme.palette.background.scrollBackground,
    },
  },
}))(Menu);

export type Option = {
  _id?: string;
  name: string;
};

export type SelectProps = {
  label?: string;
  options: Option[];
  onChange?: (value: string) => void;
  value?: string;
};

/**
 * @component Select
 * @summary shared Select
 */
function Select({ label, options, onChange = () => {}, value = '' }: SelectProps) {
  const theme = useTheme();
  const classes = useStyles();
  const [, setValue] = useState<string>(value);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [labelColor, setLabelColor] = useState<string>(theme.palette.grey[400]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    if (options !== undefined) {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ItemClickHandler = (opt: Option) => {
    setValue(opt._id as string);
    onChange(opt._id as string);
    setSelectedTitle(opt.name);
    setLabelColor('');
    setAnchorEl(null);
  };

  return (
    <Paper elevation={0} variant="outlined">
      <div className={classes.root}>
        <ButtonBase
          className={classes.baseButton}
          focusRipple
          onClick={handleOpen}
          aria-controls="fade-menu"
          aria-haspopup="true"
        >
          <div className={classes.select}>
            <Typography variant="subtitle2" style={{ color: labelColor }}>
              {selectedTitle !== '' ? selectedTitle : label}
            </Typography>
            <DownArrow fontSize="small" style={{ color: theme.palette.grey[500] }} />
          </div>
        </ButtonBase>
      </div>
      <StyledMenu
        variant="menu"
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {options !== undefined
          ? options.map((opt: Option) => (
              <MenuItem onClick={() => ItemClickHandler(opt)} key={opt._id} value={opt.name}>
                <div className={classes.name}>{opt.name}</div>
              </MenuItem>
            ))
          : null}
      </StyledMenu>
    </Paper>
  );
}

export default Select;

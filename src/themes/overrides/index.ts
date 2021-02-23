import { Overrides } from '@material-ui/core/styles/overrides';

import { Palette } from '@material-ui/core/styles/createPalette';

import MuiAppBar from './MuiAppBar';
import MuiListItem from './MuiListItem';
import MuiSvgIcon from './MuiSvgIcon';
import MuiFormControlLabel from './MuiFormControlLabel';
import MuiButton from './MuiButton';
import MuiTableCell from './MuiTableCell';

const createOverrides = (palette: Palette): Overrides => {
  return {
    MuiAppBar,
    MuiListItem,
    MuiSvgIcon: MuiSvgIcon(palette),
    MuiFormControlLabel: MuiFormControlLabel(palette),
    MuiButton: MuiButton(palette),
    MuiTableCell,
    MuiCssBaseline: {
      '@global': {
        a: {
          textDecoration: 'none',
          color: palette.text.primary,
        },
      },
    },
  };
};

export default createOverrides;

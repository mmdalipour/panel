import { fade, lighten, StyleRules } from '@material-ui/core/styles';
import { ButtonClassKey } from '@material-ui/core/Button';
import { Palette } from '@material-ui/core/styles/createPalette';

// palette

const MuiButton = (palette: Palette): Partial<StyleRules<ButtonClassKey>> => ({
  // containedPrimary: {
  //   '&$disabled': {
  //     background: fade(palette.primary.main, 0.1),
  //   },
  // },
  // contained: {
  //   backgroundColor: palette.background.paper,
  // },
  // outlined: {
  //   borderColor: lighten(palette.divider, 0.075),
  // },
});

export default MuiButton;

import { StyleRules } from '@material-ui/core/styles';
import { SvgIconClassKey } from '@material-ui/core/SvgIcon';

// palette
import { Palette } from '@material-ui/core/styles/createPalette';

const MuiSvgIcon = (palette: Palette): Partial<StyleRules<SvgIconClassKey>> => ({
  // colorSecondary: {
  //   color: palette.text.secondary,
  // },
  // colorPrimary: {
  //   color: palette.text.primary,
  // },
});

export default MuiSvgIcon;

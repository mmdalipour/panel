import { FormControlLabelClassKey } from '@material-ui/core/FormControlLabel';
import { StyleRules } from '@material-ui/core/styles';

// palette
import { Palette } from '@material-ui/core/styles/createPalette';

const MuiFormControlLabel = (palette: Palette): Partial<StyleRules<FormControlLabelClassKey>> => ({
  label: {
    fontSize: 12,
    color: palette.text.secondary,
  },
});

export default MuiFormControlLabel;

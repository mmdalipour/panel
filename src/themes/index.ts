import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

import createTypography from './typography';
import spacing from './spacing';
import breakpoints from './breakpoints';
import shadows from './shadows';
import createOverrides from './overrides';

// default theme
import * as ThemePaletteOptions from './palettes';

type ComponentColor = { background: string; color: string };

declare module '@material-ui/core/styles/withStyles' {
  // Augment the BaseCSSProperties so that we can control jss-rtl
  interface BaseCSSProperties {
    /**
     * Used to control if the rule-set should be affected by rtl transformation
     */
    flip?: boolean;
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    sideBar: ComponentColor & {
      footer: ComponentColor;
      actions: {
        selected: string;
      };
    };
    appBar: ComponentColor;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    sideBar: ComponentColor & {
      footer: ComponentColor;
      actions: {
        selected: string;
      };
    };
    appBar: ComponentColor;
  }

  interface Palette {
    sideBar: ComponentColor & {
      footer: ComponentColor;
      actions: {
        selected: string;
      };
    };
    appBar: ComponentColor;
  }

  interface TypeBackground {}

  interface CommonColors {}
}

export type Direction = 'rtl' | 'ltr';
export type ThemePalette = keyof typeof ThemePaletteOptions;

const theme = (
  paletteKey: ThemePalette = 'defaultTheme',
  direction: Direction = 'rtl'
) => {
  const palette = ThemePaletteOptions[paletteKey];

  const overrides = createOverrides(palette);
  const typography = createTypography(palette);

  return createMuiTheme({
    palette,
    direction,
    typography,
    spacing,
    breakpoints,
    overrides,
    shadows,
    props: {
      MuiButtonBase: {
        // disableRipple: true,
      },
    },
    shape: {
      borderRadius: 6,
    },
  });
};

export default theme;

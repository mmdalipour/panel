import { makeStyles, Theme } from '@material-ui/core/styles';

import { setSettingInStorage } from 'lib/Storage';

import * as themes from 'themes/palettes';
import { ThemePalette } from 'themes';

import { useSettingsState, Settings } from 'providers/SettingsProvider';

// constants
import { SPACING, SPACING_HALF } from 'constants/spacing';

// components
import Drawer, { DrawerProps } from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ThemeButton from 'components/ThemeButton';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 258,
  },
  drawerWrapper: {
    padding: theme.spacing(SPACING_HALF, 0),
  },
  drawerTitle: {
    marginBottom: theme.spacing(SPACING),
  },
  divider: {
    margin: theme.spacing(SPACING, 0),
  },
}));

export type ThemeDrawerProps = {} & DrawerProps;

type ThemeItem = {
  key: ThemePalette;
  label: string;
  primaryColor: string;
  secondaryColor?: string;
};
const themeList: ThemeItem[] = [
  {
    key: 'defaultTheme',
    label: 'اصلی',
    primaryColor: themes.defaultTheme.background.default,
    secondaryColor: themes.defaultTheme.sideBar.background,
  },
  {
    key: 'darkBlueTheme',
    label: 'تاریک',
    primaryColor: themes.darkBlueTheme.background.default,
  },
];

/**
 * @component ThemeDrawer
 */
function ThemeDrawer({ ...rest }: ThemeDrawerProps) {
  const classes = useStyles();

  const [settings, setSettings] = useSettingsState();

  return (
    <Drawer
      classes={{ paper: classes.drawer }}
      anchor="right"
      disablePortal
      {...rest}
    >
      <div className={classes.drawerWrapper}>
        <Container>
          <Typography className={classes.drawerTitle}>
            پوسته مورد نظر را انتخاب کنید
          </Typography>
          <Divider className={classes.divider} />
          <Grid container spacing={SPACING_HALF}>
            {themeList.map(({ key, label, primaryColor, secondaryColor }) => {
              return (
                <Grid item xs={6} key={key}>
                  <ThemeButton
                    selected={settings.theme === key}
                    name={label}
                    primaryColor={primaryColor}
                    secondaryColor={secondaryColor}
                    onClick={() => {
                      const newSettings: Settings = { ...settings, theme: key };
                      setSettings(newSettings);
                      setSettingInStorage(newSettings);
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    </Drawer>
  );
}

export default ThemeDrawer;

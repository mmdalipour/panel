import { useEffect } from 'react';
// react-router-dom
import { BrowserRouter as Router } from 'react-router-dom';

// theme
import theme from 'themes';

// providers
import { useSettingsState } from 'providers/SettingsProvider';
import { StylesProvider } from 'providers/StylesProvider';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

// components
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from 'Routes';
import { getSettingsInStorage } from 'lib/Storage';

/**
 * @component ThemedApp
 * @summary this is the main application wrapper all pages will render withing
 * this component the main reason is to seprate theme from app and also use provider hooks within this component
 */
function ThemedApp() {
  const [settings, setSettings] = useSettingsState();

  useEffect(() => {
    const localSettings = getSettingsInStorage();

    // check if localSettings exists and also we need to check for diffrence with global setting state value
    if (localSettings) {
      // if we found any settings we apply settings
      setSettings({ ...settings, ...localSettings });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme(settings.theme, settings.dir)}>
      <StylesProvider>
        <div dir={settings.dir}>
          <SnackbarProvider
            style={{ fontFamily: 'Shabnam, Poppins, sans-serif', direction: 'rtl' }}
          >
            <CssBaseline />
            {/* base application */}
            <Router>
              <Routes />
            </Router>
            {/* end base application */}
          </SnackbarProvider>
        </div>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default ThemedApp;

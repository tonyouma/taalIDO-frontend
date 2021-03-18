import rtl from 'jss-rtl';
import { create } from 'jss';
import palette from './palette';
import shadows from './shadows';
import PropTypes from 'prop-types';
import typography from './typography';
import breakpoints from './breakpoints';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import GlobalStyles from './globalStyles';
import borderRadius from './borderRadius';
import componentsOverride from './overrides';
import { CacheProvider } from '@emotion/react';
import useSettings from 'src/hooks/useSettings';
import React, { useMemo, useEffect } from 'react';
import {
  jssPreset,
  ThemeProvider,
  createMuiTheme,
  StylesProvider
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

// ----------------------------------------------------------------------

RTLProvider.propTypes = {
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  children: PropTypes.node
};

function RTLProvider({ direction, children }) {
  const isRTL = direction === 'rtl';
  const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
  });

  const cache = createCache({
    key: isRTL ? 'rtl' : 'css',
    prepend: true,
    stylisPlugins: isRTL ? [rtlPlugin] : []
  });

  cache.compat = true;

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  return (
    <CacheProvider value={cache}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </CacheProvider>
  );
}

ThemeConfig.propTypes = {
  children: PropTypes.node
};

function ThemeConfig({ children }) {
  const { themeMode, themeDirection } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions = useMemo(
    () => ({
      palette: palette[isLight ? 'light' : 'dark'],
      shadows: shadows[isLight ? 'light' : 'dark'],
      typography: typography,
      shape: borderRadius,
      breakpoints: breakpoints,
      direction: themeDirection,
      components: componentsOverride({
        theme: {
          palette: palette[isLight ? 'light' : 'dark'],
          shadows: shadows[isLight ? 'light' : 'dark'],
          typography: typography,
          shape: borderRadius,
          direction: themeDirection
        }
      })
    }),
    [isLight, themeDirection]
  );

  const theme = createMuiTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <RTLProvider direction={themeDirection}>{children}</RTLProvider>
    </ThemeProvider>
  );
}

export default ThemeConfig;

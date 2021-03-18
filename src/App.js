import React from 'react';
import { ThemeConfig } from './theme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { store, persistor } from './redux/store';
import routes, { renderRoutes } from 'src/routes';
import ScrollToTop from 'src/components/ScrollToTop';
import LoadingScreen from 'src/components/LoadingScreen';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import NotistackProvider from 'src/components/NotistackProvider';
import { PersistGate } from 'redux-persist/lib/integration/react';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

// Using for Auth (Check doc https://minimals.cc/docs/authentication)
import JwtProvider from 'src/components/Auth/JwtProvider';
// import FirebaseProvider from 'src/components/Auth/FirebaseProvider';

// ----------------------------------------------------------------------

const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeConfig>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <NotistackProvider>
              <Router history={history}>
                <JwtProvider>
                  <ScrollToTop />
                  <GoogleAnalytics />
                  {renderRoutes(routes)}
                </JwtProvider>
              </Router>
            </NotistackProvider>
          </LocalizationProvider>
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}

export default App;

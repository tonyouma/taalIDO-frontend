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

import {
  Web3ReactProvider,
  useWeb3React,
  nsupportedChainIdError
} from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

// ----------------------------------------------------------------------

const history = createBrowserHistory();

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <Web3ReactProvider getLibrary={getLibrary}>
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
        </Web3ReactProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

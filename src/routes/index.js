import NProgress from 'nprogress';
import AppRoutes from './AppRoutes';
import { PATH_PAGE } from './paths';
import HomeRoutes from './HomeRoutes';
import LoadingScreen from 'src/components/LoadingScreen';
import GuestProtect from 'src/components/Auth/GuestProtect';
import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense, Fragment, lazy, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const nprogressStyle = makeStyles((theme) => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 2px ${theme.palette.primary.main}`
      },
      '& .peg': {
        right: 0,
        opacity: 1,
        width: 100,
        height: '100%',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(3deg) translate(0px, -4px)',
        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
      }
    }
  }
}));

function RouteProgress(props) {
  nprogressStyle();

  NProgress.configure({
    speed: 500,
    showSpinner: false
  });

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, []);

  return <Route {...props} />;
}

export function renderRoutes(routes = []) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;

          return (
            <RouteProgress
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

const routes = [
  // Others Routes
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/Page404View'))
  },
  {
    exact: true,
    path: '/500',
    component: lazy(() => import('src/views/errors/Page500View'))
  },

  // App Routes
  AppRoutes,

  // Home Routes
  HomeRoutes
];

export default routes;

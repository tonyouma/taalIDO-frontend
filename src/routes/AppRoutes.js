import { PATH_APP } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProtect from 'src/components/Auth/AuthProtect';
import DashboardLayout from 'src/layouts/DashboardLayout';

// ----------------------------------------------------------------------

const AppRoutes = {
  path: PATH_APP.root,
  // guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // TAALSWAP : POOLS
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.root,
      component: lazy(() => import('src/views/taalswap/PoolListView'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.root,
      component: lazy(() => import('src/views/taalswap/PoolListView'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.pools,
      component: lazy(() => import('src/views/taalswap/PoolListView'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.application.root,
      component: lazy(() => import('src/views/taalswap/ApplicationView/List'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.application.admin,
      component: lazy(() => import('src/views/taalswap/ApplicationView/Admin'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.application.information,
      component: lazy(() => import('src/views/taalswap/ApplicationView'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.application.start,
      component: lazy(() => import('src/views/taalswap/ApplicationView/Start'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.application.list,
      component: lazy(() => import('src/views/taalswap/ApplicationView/List'))
    },

    {
      exact: true,
      path: PATH_APP.taalswap.swap,
      component: lazy(() => import('src/views/taalswap/SwapView'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.admin,
      component: lazy(() => import('src/views/taalswap/AdminView'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.pooldetails,
      component: lazy(() => import('src/views/taalswap/PoolDetails'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.participate,
      component: lazy(() => import('src/views/taalswap/SwapView/Participate'))
    },
    {
      exact: true,
      path: PATH_APP.taalswap.applicationpage,
      component: lazy(() => import('src/views/taalswap/ApplicationPage'))
    },

    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AppRoutes;

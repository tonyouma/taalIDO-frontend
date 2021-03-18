import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { PATH_DOCS } from 'src/routes/paths';
import DocsLayout from 'src/layouts/DocsLayout';

// ----------------------------------------------------------------------

const DocsRoutes = {
  path: PATH_DOCS.root,
  layout: DocsLayout,
  routes: [
    // GETTING STARTED
    {
      exact: true,
      path: PATH_DOCS.introduction,
      component: lazy(() =>
        import('src/views/docs/getting-started/IntroductionView')
      )
    },

    {
      exact: true,
      path: PATH_DOCS.started,
      component: lazy(() =>
        import('src/views/docs/getting-started/QuickStartView')
      )
    },

    // THEME UI
    {
      exact: true,
      path: PATH_DOCS.color,
      component: lazy(() => import('src/views/docs/theme/ColorView'))
    },
    {
      exact: true,
      path: PATH_DOCS.typography,
      component: lazy(() => import('src/views/docs/theme/TypopgrahyView'))
    },
    {
      exact: true,
      path: PATH_DOCS.icon,
      component: lazy(() => import('src/views/docs/theme/IconView'))
    },
    {
      exact: true,
      path: PATH_DOCS.shadows,
      component: lazy(() => import('src/views/docs/theme/ShadowView'))
    },
    {
      exact: true,
      path: PATH_DOCS.components,
      component: lazy(() => import('src/views/docs/theme/ComponentsView'))
    },
    {
      exact: true,
      path: PATH_DOCS.tips,
      component: lazy(() => import('src/views/docs/theme/TipsView'))
    },

    // DEVELOPMENT
    {
      exact: true,
      path: PATH_DOCS.routing,
      component: lazy(() => import('src/views/docs/development/RoutingView'))
    },
    {
      exact: true,
      path: PATH_DOCS.environmentVariables,
      component: lazy(() =>
        import('src/views/docs/development/EnvironmentVariablesView')
      )
    },
    {
      exact: true,
      path: PATH_DOCS.stateManagement,
      component: lazy(() =>
        import('src/views/docs/development/StateManagement')
      )
    },
    {
      exact: true,
      path: PATH_DOCS.apiCalls,
      component: lazy(() => import('src/views/docs/development/APICallsView'))
    },
    {
      exact: true,
      path: PATH_DOCS.analytics,
      component: lazy(() => import('src/views/docs/development/AnalyticsView'))
    },
    {
      exact: true,
      path: PATH_DOCS.authentication,
      component: lazy(() =>
        import('src/views/docs/development/AuthenticationView')
      )
    },
    {
      exact: true,
      path: PATH_DOCS.multiLanguage,
      component: lazy(() =>
        import('src/views/docs/development/MultiLanguageView')
      )
    },
    {
      exact: true,
      path: PATH_DOCS.lazyload,
      component: lazy(() => import('src/views/docs/development/LazyloadView'))
    },
    {
      exact: true,
      path: PATH_DOCS.formHelper,
      component: lazy(() => import('src/views/docs/development/FormHelperView'))
    },

    // SUPPORT & CHANGELOG
    {
      exact: true,
      path: PATH_DOCS.support,
      component: lazy(() => import('src/views/docs/support-log/SupportView'))
    },
    {
      exact: true,
      path: PATH_DOCS.changelog,
      component: lazy(() => import('src/views/docs/support-log/ChangelogView'))
    },
    {
      exact: true,
      path: PATH_DOCS.root,
      component: () => <Redirect to={PATH_DOCS.introduction} />
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DocsRoutes;

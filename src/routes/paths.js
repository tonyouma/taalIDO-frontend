// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  // auth: '/auth',
  app: '/app'
  // docs: '/docs'
};

export const PATH_PAGE = {
  // auth: {
  //   root: ROOTS.auth,
  //   login: path(ROOTS.auth, '/login'),
  //   loginUnprotected: path(ROOTS.auth, '/login-unprotected'),
  //   register: path(ROOTS.auth, '/register'),
  //   registerUnprotected: path(ROOTS.auth, '/register-unprotected'),
  //   resetPassword: path(ROOTS.auth, '/reset-password'),
  //   verify: path(ROOTS.auth, '/verify')
  // },
  // comingSoon: '/coming-soon',
  // maintenance: '/maintenance',
  // pricing: '/pricing',
  // payment: '/payment'
};

export const PATH_HOME = {
  // components: '/components',
  // cloud: 'https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0',
  // purchase: 'https://material-ui.com/store/items/minimal-dashboard/',
  // dashboard: ROOTS.app,
  // docs: 'https://app.gitbook.com/@taalswap/s/taalswap-documents/',
  // temporary:
  //   'https://taalswap.gitbook.io/taalswap-documents/getting-started/core-features-of-taalswap'
};

export const PATH_APP = {
  root: ROOTS.app,
  taalswap: {
    root: path(ROOTS.app, '/taalswap'),
    pools: path(ROOTS.app, '/taalswap/pools'),
    swap: path(ROOTS.app, '/taalswap/pools/swap'),
    application: {
      root: path(ROOTS.app, '/taalswap/application'),
      information: path(ROOTS.app, '/taalswap/application/information'),
      start: path(ROOTS.app, '/taalswap/application/start'),
      list: path(ROOTS.app, '/taalswap/application/list'),
      admin: path(ROOTS.app, '/taalswap/application/admin')
    },

    pooldetails: path(ROOTS.app, '/taalswap/pooldetails'),
    participate: path(ROOTS.app, '/taalswap/participate'),
    applicationpage: path(ROOTS.app, '/taalswap/applicationpage')
  }
};
//
// export const PATH_DOCS = {
//   root: ROOTS.docs,
//   introduction: path(ROOTS.docs, '/introduction'),
//   started: path(ROOTS.docs, '/getting-started'),
//   // Theme UI
//   color: path(ROOTS.docs, '/color'),
//   typography: path(ROOTS.docs, '/typography'),
//   icon: path(ROOTS.docs, '/icon'),
//   shadows: path(ROOTS.docs, '/shadows'),
//   components: path(ROOTS.docs, '/components'),
//   tips: path(ROOTS.docs, '/tips'),
//
//   // Development
//   routing: path(ROOTS.docs, '/routing'),
//   environmentVariables: path(ROOTS.docs, '/environment-variables'),
//   stateManagement: path(ROOTS.docs, '/state-management'),
//   apiCalls: path(ROOTS.docs, '/api-calls'),
//   analytics: path(ROOTS.docs, '/analytics'),
//   authentication: path(ROOTS.docs, '/authentication'),
//   multiLanguage: path(ROOTS.docs, '/multi-language'),
//   lazyload: path(ROOTS.docs, '/lazyload-image'),
//   formHelper: path(ROOTS.docs, '/form-helper'),
//
//   // Changelog
//   support: path(ROOTS.docs, '/support'),
//   changelog: path(ROOTS.docs, '/changelog')
// };

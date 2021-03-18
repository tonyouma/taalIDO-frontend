import React from 'react';
import { MLabel, MIcon } from 'src/theme';
import { PATH_APP, PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

const path = (name) => `/static/icons/navbar/${name}.svg`;

const ICONS = {
  authenticator: <MIcon src={path('ic_authenticator')} />,
  blog: <MIcon src={path('ic_blog')} />,
  calendar: <MIcon src={path('ic_calendar')} />,
  cart: <MIcon src={path('ic_cart')} />,
  charts: <MIcon src={path('ic_charts')} />,
  chat: <MIcon src={path('ic_chat')} />,
  components: <MIcon src={path('ic_components')} />,
  dashboard: <MIcon src={path('ic_dashboard')} />,
  editor: <MIcon src={path('ic_editor')} />,
  elements: <MIcon src={path('ic_elements')} />,
  error: <MIcon src={path('ic_error')} />,
  mail: <MIcon src={path('ic_mail')} />,
  map: <MIcon src={path('ic_map')} />,
  page: <MIcon src={path('ic_page')} />,
  user: <MIcon src={path('ic_user')} />,
  upload: <MIcon src={path('ic_upload')} />,
  copy: <MIcon src={path('ic_copy')} />,
  carousel: <MIcon src={path('ic_carousel')} />,
  language: <MIcon src={path('ic_language')} />
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'dashboard',
        icon: ICONS.dashboard,
        href: PATH_APP.general.root,
        items: [
          {
            title: 'app',
            href: PATH_APP.general.root
          },
          {
            title: 'e-commerce',
            href: PATH_APP.general.ecommerce
          },
          {
            title: 'analytics',
            href: PATH_APP.general.analytics
          }
        ]
      }
    ]
  },
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        icon: ICONS.user,
        href: PATH_APP.management.user.root,
        items: [
          {
            title: 'profile',
            href: PATH_APP.management.user.profile
          },
          {
            title: 'cards',
            href: PATH_APP.management.user.cards
          },
          {
            title: 'list',
            href: PATH_APP.management.user.list
          },
          {
            title: 'account',
            href: PATH_APP.management.user.account
          }
        ]
      },

      // MANAGEMENT : E-COMMERCE
      // ----------------------------------------------------------------------
      {
        title: 'e-commerce',
        icon: ICONS.cart,
        href: PATH_APP.management.eCommerce.root,
        items: [
          {
            title: 'shop',
            href: PATH_APP.management.eCommerce.products
          },
          {
            title: 'product',
            href: PATH_APP.management.eCommerce.productById
          },
          {
            title: 'list',
            href: PATH_APP.management.eCommerce.list
          },
          {
            title: 'checkout',
            href: PATH_APP.management.eCommerce.checkout
          },
          {
            title: 'invoice',
            href: PATH_APP.management.eCommerce.invoice
          }
        ]
      },

      // MANAGEMENT : BLOG
      // ----------------------------------------------------------------------
      {
        title: 'blog',
        icon: ICONS.blog,
        href: PATH_APP.management.blog.root,
        items: [
          {
            title: 'posts',
            href: PATH_APP.management.blog.root
          },
          {
            title: 'post',
            href: PATH_APP.management.blog.postById
          },
          {
            title: 'new post',
            href: PATH_APP.management.blog.newPost
          }
        ]
      }
    ]
  },
  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        href: PATH_APP.app.mail.root,
        icon: ICONS.mail
      },
      {
        title: 'chat',
        href: PATH_APP.app.chat.root,
        icon: ICONS.chat
      },
      {
        title: 'calendar',
        href: PATH_APP.app.calendar,
        icon: ICONS.calendar
      }
    ]
  },
  // PAGES
  // ----------------------------------------------------------------------
  {
    subheader: 'pages',
    items: [
      {
        title: 'auth',
        href: PATH_PAGE.auth.loginUnprotected,
        icon: ICONS.authenticator,
        items: [
          {
            title: 'login',
            href: PATH_PAGE.auth.loginUnprotected
          },
          {
            title: 'register',
            href: PATH_PAGE.auth.registerUnprotected
          },
          {
            title: 'reset password',
            href: PATH_PAGE.auth.resetPassword
          },
          {
            title: 'verify code',
            href: PATH_PAGE.auth.verify
          }
        ]
      },
      {
        title: 'errors & status',
        href: '/404',
        icon: ICONS.error,
        items: [
          {
            title: 'page 404',
            href: '/404'
          },
          {
            title: 'page 500',
            href: '/500'
          },
          {
            title: 'maintenance',
            href: PATH_PAGE.maintenance
          },
          {
            title: 'coming soon',
            href: PATH_PAGE.comingSoon
          }
        ]
      },
      {
        title: 'landing page',
        href: '/',
        icon: ICONS.page
      },
      {
        title: 'pricing',
        href: PATH_PAGE.pricing,
        icon: ICONS.page
      },
      {
        title: 'payment',
        href: PATH_PAGE.payment,
        icon: ICONS.page
      }
    ]
  },
  // UI KIT
  // ----------------------------------------------------------------------
  {
    subheader: 'UI kit',
    items: [
      {
        // FOUNDATIONS
        // ----------------------------------------------------------------------
        title: 'foundations',
        href: PATH_APP.foundations.root,
        icon: ICONS.elements,
        items: [
          {
            title: 'colors',
            href: PATH_APP.foundations.colors
          },
          {
            title: 'typography',
            href: PATH_APP.foundations.typography
          },
          {
            title: 'shadows',
            href: PATH_APP.foundations.shadows
          },
          {
            title: 'grid',
            href: PATH_APP.foundations.grid
          },
          {
            title: 'icons',
            href: PATH_APP.foundations.icons
          }
        ]
      },
      {
        // COMPONENTS
        // ----------------------------------------------------------------------
        title: 'components',
        href: PATH_APP.components.root,
        icon: ICONS.components,
        info: (
          <MLabel variant="filled" color="error">
            32+
          </MLabel>
        ),
        items: [
          {
            title: 'accordion',
            href: PATH_APP.components.accordion
          },
          {
            title: 'alert',
            href: PATH_APP.components.alert
          },
          {
            title: 'autocomplete',
            href: PATH_APP.components.autocomplete
          },
          {
            title: 'avatar',
            href: PATH_APP.components.avatar
          },
          {
            title: 'badge',
            href: PATH_APP.components.badge
          },
          {
            title: 'breadcrumbs',
            href: PATH_APP.components.breadcrumbs
          },
          {
            title: 'buttons',
            href: PATH_APP.components.buttons
          },
          {
            title: 'chip',
            href: PATH_APP.components.chip
          },
          {
            title: 'dialog',
            href: PATH_APP.components.dialog
          },
          {
            title: 'label',
            href: PATH_APP.components.label
          },
          {
            title: 'lists',
            href: PATH_APP.components.lists
          },
          {
            title: 'menu',
            href: PATH_APP.components.menu
          },
          {
            title: 'pagination',
            href: PATH_APP.components.pagination
          },
          {
            title: 'pickers',
            href: PATH_APP.components.pickers
          },
          {
            title: 'popover',
            href: PATH_APP.components.popover
          },
          {
            title: 'progress',
            href: PATH_APP.components.progress
          },
          {
            title: 'rating',
            href: PATH_APP.components.rating
          },
          {
            title: 'selection controls',
            href: PATH_APP.components.selectionControls
          },
          {
            title: 'slider',
            href: PATH_APP.components.slider
          },
          {
            title: 'snackbar',
            href: PATH_APP.components.snackbar
          },
          {
            title: 'stepper',
            href: PATH_APP.components.stepper
          },
          {
            title: 'tabs',
            href: PATH_APP.components.tabs
          },
          {
            title: 'table',
            href: PATH_APP.components.table
          },
          {
            title: 'text field',
            href: PATH_APP.components.textfield
          },
          {
            title: 'timeline',
            href: PATH_APP.components.timeline
          },
          {
            title: 'tooltip',
            href: PATH_APP.components.tooltip
          },
          {
            title: 'transfer list',
            href: PATH_APP.components.transferList
          },
          {
            title: 'tree view',
            href: PATH_APP.components.treeView
          }
        ]
      },

      // EXTRA COMPONENTS
      // ----------------------------------------------------------------------
      {
        title: 'charts',
        href: PATH_APP.components.chart.root,
        icon: ICONS.charts,
        items: [
          {
            title: 'apexcharts',
            href: PATH_APP.components.chart.apexcharts
          },
          {
            title: 'recharts',
            href: PATH_APP.components.chart.recharts
          }
        ]
      },
      {
        title: 'map',
        href: PATH_APP.components.map.root,
        icon: ICONS.map,
        items: [
          {
            title: 'mapbox',
            href: PATH_APP.components.map.mapbox
          },
          {
            title: 'google map',
            href: PATH_APP.components.map.google
          }
        ]
      },
      {
        title: 'editor',
        href: PATH_APP.components.editor,
        icon: ICONS.editor
      },
      {
        title: 'copy To clipboard',
        href: PATH_APP.components.copyToClipboard,
        icon: ICONS.copy
      },
      {
        title: 'upload',
        href: PATH_APP.components.upload,
        icon: ICONS.upload
      },
      {
        title: 'carousel',
        href: PATH_APP.components.carousel,
        icon: ICONS.carousel
      },
      {
        title: 'multi language',
        href: PATH_APP.components.multiLanguage,
        icon: ICONS.language
      }
    ]
  }
];

export default navConfig;

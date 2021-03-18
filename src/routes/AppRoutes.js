import { PATH_APP } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProtect from 'src/components/Auth/AuthProtect';
import DashboardLayout from 'src/layouts/DashboardLayout';

// ----------------------------------------------------------------------

const AppRoutes = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.general.dashboard,
      component: lazy(() => import('src/views/general/DashboardAppView'))
    },
    {
      exact: true,
      path: PATH_APP.general.ecommerce,
      component: lazy(() => import('src/views/general/DashboardEcommerceView'))
    },
    {
      exact: true,
      path: PATH_APP.general.analytics,
      component: lazy(() => import('src/views/general/DashboardAnalyticsView'))
    },
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.general.root} />
    },

    // MANAGEMENT : E-COMMERCE
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.management.eCommerce.products,
      component: lazy(() => import('src/views/e-commerce/ShopView'))
    },
    {
      exact: true,
      path: PATH_APP.management.eCommerce.product,
      component: lazy(() => import('src/views/e-commerce/ProductDetailsView'))
    },
    {
      exact: true,
      path: PATH_APP.management.eCommerce.list,
      component: lazy(() => import('src/views/e-commerce/ProductListView'))
    },
    {
      exact: true,
      path: PATH_APP.management.eCommerce.checkout,
      component: lazy(() => import('src/views/e-commerce/CheckoutView'))
    },
    {
      exact: true,
      path: PATH_APP.management.eCommerce.invoice,
      component: lazy(() => import('src/views/e-commerce/InvoiceView'))
    },
    {
      exact: true,
      path: PATH_APP.management.eCommerce.root,
      component: () => <Redirect to={PATH_APP.management.eCommerce.products} />
    },

    // MANAGEMENT : BLOG
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.management.blog.root,
      component: lazy(() => import('src/views/blog/BlogView'))
    },
    {
      exact: true,
      path: PATH_APP.management.blog.post,
      component: lazy(() => import('src/views/blog/PostDetailsView'))
    },
    {
      exact: true,
      path: PATH_APP.management.blog.newPost,
      component: lazy(() => import('src/views/blog/NewPostView'))
    },

    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.management.user.profile,
      component: lazy(() => import('src/views/user/ProfileView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.cards,
      component: lazy(() => import('src/views/user/UserCardsView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.list,
      component: lazy(() => import('src/views/user/UserListView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.account,
      component: lazy(() => import('src/views/user/AccountView'))
    },
    {
      exact: true,
      path: PATH_APP.management.user.root,
      component: () => <Redirect to={PATH_APP.management.user.profile} />
    },
    {
      exact: true,
      path: PATH_APP.management.root,
      component: () => <Redirect to={PATH_APP.management.user.profile} />
    },

    // APP : CHAT
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.app.chat.conversation,
      component: lazy(() => import('src/views/app/ChatView'))
    },
    {
      exact: true,
      path: PATH_APP.app.chat.root,
      component: () => <Redirect to={PATH_APP.app.chat.new} />
    },

    // APP : MAIL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.app.mail.labels,
      component: lazy(() => import('src/views/app/MailView'))
    },
    {
      exact: true,
      path: PATH_APP.app.mail.root,
      component: () => <Redirect to={PATH_APP.app.mail.all} />
    },

    // APP : CALENDAR
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.app.calendar,
      component: lazy(() => import('src/views/app/CalendarView'))
    },

    // FOUNDATIONS
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.foundations.colors,
      component: lazy(() => import('src/views/uikit/foundations/ColorsView'))
    },
    {
      exact: true,
      path: PATH_APP.foundations.typography,
      component: lazy(() =>
        import('src/views/uikit/foundations/TypographyView')
      )
    },
    {
      exact: true,
      path: PATH_APP.foundations.shadows,
      component: lazy(() => import('src/views/uikit/foundations/ShadowsView'))
    },
    {
      exact: true,
      path: PATH_APP.foundations.grid,
      component: lazy(() => import('src/views/uikit/foundations/GridView'))
    },
    {
      exact: true,
      path: PATH_APP.foundations.icons,
      component: lazy(() => import('src/views/uikit/foundations/IconsView'))
    },
    {
      exact: true,
      path: PATH_APP.foundations.root,
      component: () => <Redirect to={PATH_APP.foundations.colors} />
    },

    // COMPONENTS
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.components.accordion,
      component: lazy(() => import('src/views/uikit/components/AccordionView'))
    },
    {
      exact: true,
      path: PATH_APP.components.alert,
      component: lazy(() => import('src/views/uikit/components/AlertView'))
    },
    {
      exact: true,
      path: PATH_APP.components.autocomplete,
      component: lazy(() =>
        import('src/views/uikit/components/AutocompleteView')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.avatar,
      component: lazy(() => import('src/views/uikit/components/AvatarView'))
    },
    {
      exact: true,
      path: PATH_APP.components.badge,
      component: lazy(() => import('src/views/uikit/components/BadgeView'))
    },
    {
      exact: true,
      path: PATH_APP.components.breadcrumbs,
      component: lazy(() => import('src/views/uikit/components/BreadcrumbView'))
    },
    {
      exact: true,
      path: PATH_APP.components.buttons,
      component: lazy(() => import('src/views/uikit/components/ButtonsView'))
    },
    {
      exact: true,
      path: PATH_APP.components.chip,
      component: lazy(() => import('src/views/uikit/components/ChipsView'))
    },
    {
      exact: true,
      path: PATH_APP.components.dialog,
      component: lazy(() => import('src/views/uikit/components/DialogView'))
    },
    {
      exact: true,
      path: PATH_APP.components.textfield,
      component: lazy(() => import('src/views/uikit/components/TextFieldView'))
    },
    {
      exact: true,
      path: PATH_APP.components.label,
      component: lazy(() => import('src/views/uikit/components/LabelView'))
    },
    {
      exact: true,
      path: PATH_APP.components.lists,
      component: lazy(() => import('src/views/uikit/components/ListsView'))
    },
    {
      exact: true,
      path: PATH_APP.components.menu,
      component: lazy(() => import('src/views/uikit/components/MenusView'))
    },
    {
      exact: true,
      path: PATH_APP.components.pagination,
      component: lazy(() => import('src/views/uikit/components/PaginationView'))
    },
    {
      exact: true,
      path: PATH_APP.components.pickers,
      component: lazy(() => import('src/views/uikit/components/PickersView'))
    },
    {
      exact: true,
      path: PATH_APP.components.popover,
      component: lazy(() => import('src/views/uikit/components/PopoverView'))
    },
    {
      exact: true,
      path: PATH_APP.components.progress,
      component: lazy(() => import('src/views/uikit/components/ProgressView'))
    },
    {
      exact: true,
      path: PATH_APP.components.rating,
      component: lazy(() => import('src/views/uikit/components/RatingView'))
    },
    {
      exact: true,
      path: PATH_APP.components.selectionControls,
      component: lazy(() =>
        import('src/views/uikit/components/SelectionControlsView')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.snackbar,
      component: lazy(() => import('src/views/uikit/components/SnackbarView'))
    },
    {
      exact: true,
      path: PATH_APP.components.slider,
      component: lazy(() => import('src/views/uikit/components/SliderView'))
    },
    {
      exact: true,
      path: PATH_APP.components.stepper,
      component: lazy(() => import('src/views/uikit/components/StepperView'))
    },
    {
      exact: true,
      path: PATH_APP.components.tabs,
      component: lazy(() => import('src/views/uikit/components/TabsView'))
    },
    {
      exact: true,
      path: PATH_APP.components.table,
      component: lazy(() => import('src/views/uikit/components/TableView'))
    },
    {
      exact: true,
      path: PATH_APP.components.timeline,
      component: lazy(() => import('src/views/uikit/components/TimelineView'))
    },
    {
      exact: true,
      path: PATH_APP.components.tooltip,
      component: lazy(() => import('src/views/uikit/components/TooltipView'))
    },
    {
      exact: true,
      path: PATH_APP.components.transferList,
      component: lazy(() =>
        import('src/views/uikit/components/TransferListView')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.treeView,
      component: lazy(() => import('src/views/uikit/components/TreesView'))
    },

    // EXTRA COMPONENTS
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.components.chart.apexcharts,
      component: lazy(() =>
        import('src/views/uikit/extra-components/ChartsView/Apexcharts')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.chart.recharts,
      component: lazy(() =>
        import('src/views/uikit/extra-components/ChartsView/Recharts')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.map.google,
      component: lazy(() =>
        import('src/views/uikit/extra-components/MapView/GoogleMaps')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.map.mapbox,
      component: lazy(() =>
        import('src/views/uikit/extra-components/MapView/ReactMapGL')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.editor,
      component: lazy(() =>
        import('src/views/uikit/extra-components/EditorView')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.copyToClipboard,
      component: lazy(() =>
        import('src/views/uikit/extra-components/CopyToClipboardView')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.upload,
      component: lazy(() =>
        import('src/views/uikit/extra-components/UploadView')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.carousel,
      component: lazy(() =>
        import('src/views/uikit/extra-components/CarouselView')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.multiLanguage,
      component: lazy(() =>
        import('src/views/uikit/extra-components/MultiLanguageView')
      )
    },
    {
      exact: true,
      path: PATH_APP.components.root,
      component: () => <Redirect to={PATH_APP.components.accordion} />
    },
    {
      exact: true,
      path: PATH_APP.components.chart.root,
      component: () => <Redirect to={PATH_APP.components.chart.apexcharts} />
    },
    {
      exact: true,
      path: PATH_APP.components.map.root,
      component: () => <Redirect to={PATH_APP.components.map.google} />
    },

    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AppRoutes;

export default [
  {
    path: '/user',
    name: 'user',
    icon: 'crown',
    routes: [
      {
        path: '/user/list',
        name: 'list',
        icon: 'smile',
        component: './User/List',
      },
      {
        path: '/user/details',
        name: 'details',
        icon: 'smile',
        component: './User/Details',
        parentKeys: ['/user/user-list'],
        hideInMenu: true,
      },
      {
        path: '/user/auth-list',
        name: 'auth-list',
        icon: 'smile',
        component: './Auth/List',
      },
      {
        path: '/user/auth-review',
        name: 'auth-review',
        icon: 'smile',
        component: './Auth/Review',
        parentKeys: ['/user/auth-list'],
        hideInMenu: true,
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/signal',
    name: 'signal',
    icon: 'crown',
    routes: [
      {
        path: '/signal/list',
        name: 'list',
        icon: 'smile',
        component: './Signal/SignalTab',
      },
      {
        path: '/signal/details',
        name: 'details',
        icon: 'smile',
        component: './Signal/Details',
      },
      {
        path: '/signal/review',
        name: 'review',
        icon: 'smile',
        component: './Signal/Review',
        parentKeys: ['/signal/list'],
        hideInMenu: true,
      },
      {
        path: '/signal/follow-list',
        name: 'follow',
        icon: 'smile',
        component: './Follow/List',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/user/list',
  },
  {
    component: './404',
  },
];

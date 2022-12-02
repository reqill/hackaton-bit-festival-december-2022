import { NavigationRoutes } from 'src/types';

export const NAV_ROUTES: NavigationRoutes = [
  {
    pageName: 'Home',
    relativePath: '/',
  },
  {
    pageName: 'Dashboard',
    relativePath: '/dashboard',
    nestedRoutes: [
      {
        pageName: 'Calendar',
        relativePath: '/dashboard/calendar',
        description: 'Deserunt adipisicing eu cillum commodo qui anim cillum.',
      },
      {
        pageName: 'Board',
        relativePath: '/dashboard/board',
        description: 'Mollit veniam deserunt deserunt qui qui anim sint minim.',
      },
      {
        pageName: 'Groups',
        relativePath: '/dashboard/groups',
        description: 'Excepteur adipisicing Lorem minim minim sint anim.',
      },
      {
        pageName: 'Pings',
        relativePath: '/dashboard/pings',
        description: 'Occaecat Lorem laboris non non deserunt est et e deserunt.',
      },
    ],
  },
  {
    pageName: 'FAQ',
    relativePath: '/faq',
  },
  {
    pageName: 'Settings',
    relativePath: '/settings',
  },
  {
    pageName: 'Profile',
    relativePath: '/profile',
  },
];

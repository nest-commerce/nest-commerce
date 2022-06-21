import { Route } from './routes';
import { IconDashboard } from '@tabler/icons';

export const SIDEBAR_CONFIG = [
  {
    title: 'Dashboards',
    icon: IconDashboard,
    links: [
      {
        title: 'Users',
        link: Route.Users,
      },
    ],
  },
];

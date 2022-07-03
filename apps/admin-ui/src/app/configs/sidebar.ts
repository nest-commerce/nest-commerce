import { Route } from './routes';
import { IconDashboard, IconPackage, IconUsers } from '@tabler/icons';
import { SidebarLink } from '@nest-commerce/ui';

export const SIDEBAR_CONFIG: SidebarLink[] = [
  {
    title: 'Dashboards',
    icon: IconDashboard,
    links: [
      {
        icon: IconUsers,
        title: 'Users',
        link: Route.USERS,
      },
      {
        icon: IconPackage,
        title: 'Products',
        link: Route.PRODUCTS,
      },
    ],
  },
];

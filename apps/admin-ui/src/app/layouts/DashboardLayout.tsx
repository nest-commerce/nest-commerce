import { FC, ReactNode, useState } from 'react';
import { Anchor, AppShell, Breadcrumbs, Group } from '@mantine/core';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '@nest-commerce/ui';
import AppHeader from './AppHeader';

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isOpened, setIsOpened] = useState(false);
  const breadcrumbs = useBreadcrumbs();

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={<AppNavbar isOpened={isOpened} />}
      header={<AppHeader isOpened={isOpened} setIsOpened={setIsOpened} />}
    >
      <Group className="h-full" direction="column">
        <Breadcrumbs>
          {breadcrumbs.map(({ location, name }) => (
            <Anchor component={Link} to={location} key={name}>
              {name}
            </Anchor>
          ))}
        </Breadcrumbs>
        {children}
      </Group>
    </AppShell>
  );
};

const withDashboardLayout =
  <T,>(Component: FC<T>) =>
  (props: T) =>
    (
      <DashboardLayout>
        <Component {...props} />
      </DashboardLayout>
    );

export default withDashboardLayout;

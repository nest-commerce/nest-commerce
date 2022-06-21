import { FC, ReactNode, useState } from 'react';
import { AppShell } from '@mantine/core';
import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={<AppNavbar isOpened={isOpened} />}
      header={<AppHeader isOpened={isOpened} setIsOpened={setIsOpened} />}
    >
      {children}
    </AppShell>
  );
};

const withDashboardLayout = <T,>(Component: FC<T>) => {
  return (props: T) => (
    <DashboardLayout>
      <Component {...props} />
    </DashboardLayout>
  );
};

export default withDashboardLayout;

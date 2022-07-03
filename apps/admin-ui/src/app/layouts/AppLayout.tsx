import { FC, ReactNode, useState } from 'react';
import { Anchor, Breadcrumbs, Group, ScrollArea, Stack } from '@mantine/core';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '@nest-commerce/ui';
import AppHeader from './AppHeader';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [isOpened, setIsOpened] = useState(false);
  const breadcrumbs = useBreadcrumbs();

  return (
    <Stack className="h-full w-full" spacing={0}>
      <AppHeader isOpened={isOpened} setIsOpened={setIsOpened} />
      <Group className="grow" spacing={0}>
        <AppNavbar isOpened={isOpened} />
        <Stack className="h-full grow" spacing={0}>
          <Breadcrumbs p="xs">
            {breadcrumbs.map(({ location, name }) => (
              <Anchor component={Link} to={location} key={name}>
                {name}
              </Anchor>
            ))}
          </Breadcrumbs>
          <ScrollArea
            style={{ height: 'calc(100vh - 106px)' }}
            p="xs"
            styles={{ viewport: { '> div': { height: '100%' } } }}
          >
            {children}
          </ScrollArea>
        </Stack>
      </Group>
    </Stack>
  );
};

const withDashboardLayout =
  <T,>(Component: FC<T>) =>
  (props: T) =>
    (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    );

export default withDashboardLayout;

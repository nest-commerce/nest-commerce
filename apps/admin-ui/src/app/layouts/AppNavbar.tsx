import { Group, Navbar, Title } from '@mantine/core';
import { SIDEBAR_CONFIG } from '../configs/sidebar';
import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarNav, SidebarLink, LogoutButton } from '@nest-commerce/ui';
import { SidebarSubNav } from '@nest-commerce/ui';

interface AppNavbarProps {
  isOpened: boolean;
}

const AppNavbar: FC<AppNavbarProps> = ({ isOpened }: AppNavbarProps) => {
  const [active, setActive] = useState<SidebarLink>(SIDEBAR_CONFIG[0]);
  const { pathname } = useLocation();

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!isOpened}
      width={{ sm: 200, md: 300 }}
    >
      <Navbar.Section grow>
        <Group className="h-full" spacing={0}>
          <Group
            className="h-full border-0 border-r border-gray-300 dark:border-gray-700 border-solid"
            direction="column"
            spacing={0}
          >
            {SIDEBAR_CONFIG.map((link, index) => (
              <SidebarNav
                key={index}
                link={link}
                isActive={link.title === active.title}
                onClick={() => setActive(link)}
              />
            ))}
          </Group>
          <Group className="grow h-full" direction="column" spacing={0}>
            <Title order={4} p="sm" className="w-full">
              {active.title}
            </Title>
            {active.links.map((subLink, index) => (
              <SidebarSubNav
                key={index}
                subLink={subLink}
                isActive={pathname.includes(subLink.link)}
              />
            ))}
          </Group>
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <LogoutButton />
      </Navbar.Section>
    </Navbar>
  );
};

export default AppNavbar;

import {
  Avatar,
  Group,
  Navbar,
  Text,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { SIDEBAR_CONFIG } from '../configs/sidebar';
import { IconLogout } from '@tabler/icons';
import { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useUser from '../hooks/useUser';
import styles from './AppNavbar.module.scss';
import classnames from '../utilities/classnames';

interface AppNavbarProps {
  isOpened: boolean;
}

const AppNavbar: FC<AppNavbarProps> = ({ isOpened }: AppNavbarProps) => {
  const [active, setActive] = useState(0);
  const { pathname } = useLocation();
  const { setUser } = useUser();

  const mainLinks = SIDEBAR_CONFIG.map(({ title, icon: Icon }, index) => (
    <Tooltip
      label={title}
      position="right"
      withArrow
      transitionDuration={0}
      key={title}
    >
      <UnstyledButton
        className={classnames(
          styles['main-link'],
          title === SIDEBAR_CONFIG[active].title && styles['active']
        )}
        onClick={() => setActive(index)}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = SIDEBAR_CONFIG[active].links.map(({ link, title }) => (
    <Link
      className={classnames(
        styles['sub-link'],
        pathname === link && styles['active']
      )}
      to={link}
      key={link}
    >
      {title}
    </Link>
  ));

  return (
    <Navbar
      hiddenBreakpoint="sm"
      hidden={!isOpened}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow>
        <Group className="h-full" spacing={0}>
          <Group className="h-full border-r" direction="column" spacing={0}>
            {mainLinks}
          </Group>
          <Group className="grow h-full" direction="column" spacing={0}>
            <Title order={4} p="sm" className="w-full">
              {SIDEBAR_CONFIG[active].title}
            </Title>
            {links}
          </Group>
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group
          className="justify-between border-t hover:cursor-pointer"
          p="sm"
          onClick={() => setUser(null)}
        >
          <Avatar radius="xl" />
          <Text>Logout</Text>
          <IconLogout />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default AppNavbar;

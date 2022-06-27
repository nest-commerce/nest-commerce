import { FC } from 'react';
import { TablerIcon } from '@tabler/icons';
import { Button, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

export interface SidebarSubLink {
  title: string;
  icon: TablerIcon;
  link: string;
}

export interface SidebarSubNavProps {
  subLink: SidebarSubLink;
  isActive: boolean;
}

export const SidebarSubNav: FC<SidebarSubNavProps> = ({
  subLink,
  isActive,
}) => (
  <Button
    className="h-11 w-full"
    {...(isActive && { variant: 'light' })}
    component={Link}
    to={subLink.link}
  >
    <Group>
      <subLink.icon />
      {subLink.title}
    </Group>
  </Button>
);

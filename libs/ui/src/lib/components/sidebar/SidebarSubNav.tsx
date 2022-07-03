import { FC } from 'react';
import { TablerIcon } from '@tabler/icons';
import { Button } from '@mantine/core';
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
    className="flex h-11 w-full"
    variant={isActive ? 'light' : 'subtle'}
    component={Link}
    to={subLink.link}
    leftIcon={<subLink.icon />}
  >
    {subLink.title}
  </Button>
);

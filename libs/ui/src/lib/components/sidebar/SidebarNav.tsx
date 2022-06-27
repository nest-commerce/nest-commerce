import { Button, Tooltip } from '@mantine/core';
import { FC } from 'react';
import { SidebarSubLink } from './SidebarSubNav';
import { TablerIcon } from '@tabler/icons';

export interface SidebarLink {
  title: string;
  icon: TablerIcon;
  links: SidebarSubLink[];
}

export interface SidebarNavProps {
  link: SidebarLink;
  isActive: boolean;
  onClick: () => void;
}

export const SidebarNav: FC<SidebarNavProps> = ({
  link,
  isActive,
  onClick,
}) => (
  <Tooltip label={link.title} position="right" withArrow transitionDuration={0}>
    <Button
      className="flex h-11 w-11 justify-center"
      {...(isActive && { variant: 'light' })}
      onClick={onClick}
    >
      <link.icon />
    </Button>
  </Tooltip>
);

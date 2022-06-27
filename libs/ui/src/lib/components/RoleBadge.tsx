import { Role } from '@prisma/client';
import { Badge, DefaultMantineColor } from '@mantine/core';
import { FC } from 'react';

const ROLE_TO_COLOR_MAP: Record<Role, DefaultMantineColor> = {
  [Role.ADMIN]: 'pink',
  [Role.USER]: 'blue',
};

export interface RoleBadgeProps {
  role: Role;
}

export const RoleBadge: FC<RoleBadgeProps> = ({ role }) => (
  <Badge color={ROLE_TO_COLOR_MAP[role]} variant="light">
    {role}
  </Badge>
);

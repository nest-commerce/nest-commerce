import { SetMetadata } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from '../../types/request.interface';

export const PERMISSIONS_DECORATOR_KEY = 'permissions';

export type Permission = (user: User, param: Request) => boolean;

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_DECORATOR_KEY, permissions);

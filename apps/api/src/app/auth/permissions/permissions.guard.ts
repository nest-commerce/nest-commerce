import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Permission, PERMISSIONS_DECORATOR_KEY } from './permissions.decorator';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Request } from '../../types/request';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const permissions =
      this.reflector.get<Permission[]>(
        PERMISSIONS_DECORATOR_KEY,
        context.getHandler()
      ) ?? [];
    return this.validateRequest(request, permissions);
  }

  private validateRequest(
    request: Request,
    permissions: Permission[]
  ): boolean {
    const user = request.user;
    if (user?.role === Role.ADMIN) return true;
    if (!user || permissions.length === 0) return false;
    return permissions.every((permission) => permission(user, request));
  }
}

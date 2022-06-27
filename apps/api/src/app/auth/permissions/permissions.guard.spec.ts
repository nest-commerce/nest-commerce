import { PermissionsGuard } from './permissions.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Permission } from './permissions.decorator';

describe('PermissionsGuard', () => {
  const validReflectors: Permission[] = [
    (user, { query }) => user.id.toString() === query.id,
    (user, { params }) => user.id.toString() === params.id,
    (user, { body }) => user.id.toString() === body.id,
  ];

  const reflector = {
    get: jest.fn(),
  };

  const getRequestFn = jest.fn();

  const context = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: getRequestFn,
    }),
    getHandler: jest.fn(),
  } as unknown as ExecutionContext;

  let permissionGuard: PermissionsGuard;

  beforeEach(() => {
    permissionGuard = new PermissionsGuard(reflector as unknown as Reflector);
  });

  it('should be defined', () => {
    expect(permissionGuard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return false if user is not present', () => {
      getRequestFn.mockReturnValueOnce({});
      reflector.get.mockReturnValueOnce(validReflectors);
      const res = permissionGuard.canActivate(context);
      expect(res).toBe(false);
    });

    it('should return true if user is an Admin', () => {
      getRequestFn.mockReturnValueOnce({ user: { role: Role.ADMIN } });
      reflector.get.mockReturnValueOnce(validReflectors);
      const res = permissionGuard.canActivate(context);
      expect(res).toBe(true);
    });

    it('should return false if user is not an admin and there are no reflector checks', () => {
      getRequestFn.mockReturnValueOnce({ user: { role: Role.USER } });
      const res = permissionGuard.canActivate(context);
      expect(res).toBe(false);
    });

    it('should return false if all permissions are not met', () => {
      getRequestFn.mockReturnValueOnce({
        user: { role: Role.USER, id: 1 },
        query: {},
        params: {},
        body: {},
      });
      reflector.get.mockReturnValueOnce(validReflectors);
      const res = permissionGuard.canActivate(context);
      expect(res).toBe(false);
    });

    it('should return false if some permissions are not met', () => {
      getRequestFn.mockReturnValueOnce({
        user: { role: Role.USER, id: 1 },
        query: { id: '1' },
        params: {},
        body: {},
      });
      reflector.get.mockReturnValueOnce(validReflectors);
      const res = permissionGuard.canActivate(context);
      expect(res).toBe(false);
    });

    it('should return true if all permissions are met', () => {
      getRequestFn.mockReturnValueOnce({
        user: { role: Role.USER, id: 1 },
        query: { id: '1' },
        params: { id: '1' },
        body: { id: '1' },
      });
      reflector.get.mockReturnValueOnce(validReflectors);
      const res = permissionGuard.canActivate(context);
      expect(res).toBe(true);
    });
  });
});

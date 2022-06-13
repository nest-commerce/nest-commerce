import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { UserService } from '../user/user.service';
import { Role, User } from '@prisma/client';
import { isJWT } from 'class-validator';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  const validUser: User = {
    id: 0,
    firstName: 'test',
    lastName: 'test',
    username: 'test@test.com',
    password: 'test',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const userService = {
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    const credentials = {
      username: validUser.username,
      password: validUser.password,
    };

    it('should return auth result on valid credentials', async () => {
      userService.validateUser.mockResolvedValue(validUser);
      const result = await authService.login(credentials);
      expect(isJWT(result.accessToken)).toBe(true);
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      userService.validateUser.mockResolvedValue(null);
      await expect(
        async () => await authService.login(credentials)
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});

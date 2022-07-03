import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Role, User } from '@prisma/client';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

  const jwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, AuthService, JwtService],
    })
      .overrideProvider(JwtService)
      .useValue(jwtService)
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
      userService.validateUser.mockResolvedValueOnce(validUser);
      const expectedToken = 'test';
      jwtService.sign.mockReturnValue(expectedToken);
      const result = await authService.login(credentials);
      expect(result.accessToken).toBe(expectedToken);
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: validUser.username,
        role: validUser.role,
      });
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      userService.validateUser.mockResolvedValueOnce(null);
      await expect(
        async () => await authService.login(credentials)
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});

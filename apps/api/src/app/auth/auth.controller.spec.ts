import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;

  const authService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    const credentials = {
      username: 'username',
      password: 'password',
    };

    it('should return auth result on valid credentials', async () => {
      const expected = { accessToken: 'token' };
      authService.login.mockResolvedValueOnce(expected);
      expect(await authController.login(credentials)).toEqual(expected);
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      authService.login.mockRejectedValue(new UnauthorizedException());
      await expect(
        async () => await authController.login(credentials)
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});

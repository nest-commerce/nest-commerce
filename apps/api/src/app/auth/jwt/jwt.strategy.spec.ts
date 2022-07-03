import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../../user/user.service';
import { JwtPayload } from './jwt-payload';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  const userService = {
    findUser: jest.fn(),
  };

  const configService = {
    getOrThrow: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    configService.getOrThrow.mockReturnValue('test');
    strategy = new JwtStrategy(
      userService as unknown as UserService,
      configService as unknown as ConfigService
    );
  });

  describe('validate', () => {
    it('should return user response when user is valid', async () => {
      const validUser = {
        id: 10,
      };
      const params = { username: 'test' };
      userService.findUser.mockResolvedValueOnce(validUser);
      const result = await strategy.validate(params as JwtPayload);
      expect(result).toEqual(validUser);
      expect(userService.findUser).toHaveBeenCalledWith(params);
    });

    it('should return throw Unauthorized error when user is not found', async () => {
      const params = { username: 'test' };
      userService.findUser.mockResolvedValueOnce(null);
      await expect(
        async () => await strategy.validate(params as JwtPayload)
      ).rejects.toThrow(UnauthorizedException);
      expect(userService.findUser).toHaveBeenCalledWith(params);
    });
  });
});

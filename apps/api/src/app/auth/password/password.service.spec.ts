import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from './password.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

describe('PasswordService', () => {
  let passwordService: PasswordService;
  const configService = {
    getOrThrow: jest.fn(),
  };

  const initModule = async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService, ConfigService],
    })
      .overrideProvider(ConfigService)
      .useValue(configService)
      .compile();

    passwordService = module.get<PasswordService>(PasswordService);
  };

  it('should be defined', async () => {
    await initModule();
    expect(passwordService).toBeDefined();
  });

  describe('parseSalt', () => {
    const password = 'test';
    const hash = jest.spyOn(bcrypt, 'hash');
    const stringSalt = '$2b$10$dkk4YVdCblczZklELlpRNC';
    const numberSalt = '1';

    test.each([
      [numberSalt, Number(numberSalt)],
      [stringSalt, stringSalt],
    ])('should parse valid salt %i', async (salt, expected) => {
      configService.getOrThrow.mockReturnValueOnce(salt);
      await initModule();
      await passwordService.hash(password);
      expect(hash).toBeCalledWith(password, expected);
    });

    it('should throw on invalid numeric salt', async () => {
      const invalidSalt = '-1';
      configService.getOrThrow.mockReturnValueOnce(invalidSalt);
      await expect(async () => {
        await initModule();
      }).rejects.toThrow(Error);
    });
  });
});

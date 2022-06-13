import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User, Role } from '@prisma/client';
import { UserDto } from '@nest-commerce/data';
import { PasswordService } from '../auth/password/password.service';
import { PrismaService } from 'nestjs-prisma';
import { ConflictException } from '@nestjs/common';
import { UserModule } from './user.module';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let passwordService: PasswordService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    passwordService = module.get(PasswordService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findUser', () => {
    const validSearch = { id: 0 };
    it('should return user as UserDto', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(validUser);
      const returnedUser = await userService.findUser(validSearch);
      expect(returnedUser).not.toBeNull();
      expect(returnedUser).toBeInstanceOf(UserDto);
      expect(returnedUser).toEqual(validUser);
    });

    it('should return null if no user is found', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);
      expect(await userService.findUser(validSearch)).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create user on valid inputs and hashed password', async () => {
      prismaService.user.create = jest
        .fn()
        .mockImplementation(({ data }) => ({ ...validUser, ...data }));
      const createdUser = await userService.createUser(validUser);
      expect(createdUser).toBeInstanceOf(UserDto);
      expect(
        await passwordService.compare(validUser.password, createdUser.password)
      ).toBe(true);
    });

    it('should throw error when there is an existing user with same username', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(validUser);
      await expect(async () => {
        await userService.createUser(validUser);
      }).rejects.toThrow(ConflictException);
    });
  });

  describe('validateUser', () => {
    let hashedUser;

    beforeAll(async () => {
      hashedUser = {
        ...validUser,
        password: await passwordService.hash(validUser.password),
      };
    });

    it('should return user if password matches', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(hashedUser);
      expect(
        await userService.validateUser(validUser.username, validUser.password)
      ).toEqual(hashedUser);
    });

    it('should return null if user not found', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(null);
      expect(
        await userService.validateUser(validUser.username, validUser.password)
      ).toEqual(null);
    });

    it('should return null if password is incorrect', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValue(hashedUser);
      expect(
        await userService.validateUser(validUser.username, 'incorrectPassword')
      ).toEqual(null);
    });
  });
});

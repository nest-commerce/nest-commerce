import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User, Role } from '@prisma/client';
import { UserDto } from '@nest-commerce/data';
import { PasswordService } from '../auth/password/password.service';
import { PrismaService } from 'nestjs-prisma';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValueOnce(validUser);
      const returnedUser = await userService.findUser(validSearch);
      expect(returnedUser).not.toBeNull();
      expect(returnedUser).toBeInstanceOf(UserDto);
      expect(returnedUser).toEqual(validUser);
    });

    it('should return null if no user is found', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValueOnce(null);
      expect(await userService.findUser(validSearch)).toBeNull();
    });
  });

  describe('findUsers', () => {
    it('should return users as UserDto instances and total count', async () => {
      const expectedCount = 1;
      prismaService.user.findMany = jest
        .fn()
        .mockResolvedValueOnce([validUser]);
      prismaService.user.count = jest.fn().mockResolvedValueOnce(expectedCount);
      const result = await userService.findUsers({ page: 1, pageSize: 1 });
      expect(result.count).toBe(expectedCount);
      expect(result.users[0]).toBeInstanceOf(UserDto);
      expect(result.users[0]).toEqual(validUser);
    });

    it('should return empty array if no users are found', async () => {
      const expectedCount = 0;
      prismaService.user.findMany = jest.fn().mockResolvedValueOnce([]);
      prismaService.user.count = jest.fn().mockResolvedValueOnce(expectedCount);
      const result = await userService.findUsers({ page: 1, pageSize: 1 });
      expect(result.count).toBe(expectedCount);
      expect(result.users.length).toBe(0);
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
  });

  describe('updateUser', () => {
    it('should return user as UserDto after successful update', async () => {
      prismaService.user.update = jest.fn().mockResolvedValueOnce(validUser);
      const res = await userService.updateUser(1, {});
      expect(res).toEqual(validUser);
      expect(res).toBeInstanceOf(UserDto);
    });
  });

  describe('deleteUser', () => {
    it('should return user as UserDto after successful deletion', async () => {
      prismaService.user.delete = jest.fn().mockResolvedValueOnce(validUser);
      const res = await userService.deleteUser({});
      expect(res).toEqual(validUser);
      expect(res).toBeInstanceOf(UserDto);
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
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValueOnce(hashedUser);
      expect(
        await userService.validateUser(validUser.username, validUser.password)
      ).toEqual(hashedUser);
    });

    it('should return null if user not found', async () => {
      prismaService.user.findUnique = jest.fn().mockResolvedValueOnce(null);
      expect(
        await userService.validateUser(validUser.username, validUser.password)
      ).toEqual(null);
    });

    it('should return null if password is incorrect', async () => {
      prismaService.user.findUnique = jest
        .fn()
        .mockResolvedValueOnce(hashedUser);
      expect(
        await userService.validateUser(validUser.username, 'incorrectPassword')
      ).toEqual(null);
    });
  });
});

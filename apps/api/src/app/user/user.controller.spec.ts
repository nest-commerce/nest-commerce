import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from '@nest-commerce/data';
import { Role } from '@prisma/client';
import { ConflictException } from '@nestjs/common';

describe('UserController', () => {
  let userController: UserController;

  const userService = {
    findUser: jest.fn(),
    createUser: jest.fn(),
  };

  const validUser: UserDto = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'test@test.com',
    password: '',
    role: Role.USER,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findUser', () => {
    test.each([null, validUser])(
      'should return user if present',
      async (expected) => {
        userService.findUser.mockResolvedValueOnce(expected);
        const user = await userController.findUser({ id: 1 });
        expect(user).toBe(expected);
      }
    );
  });

  describe('createUser', () => {
    it('should return user on valid request', async () => {
      userService.createUser.mockResolvedValueOnce(validUser);
      const user = await userController.createUser(validUser);
      expect(user).toBe(validUser);
    });

    it('should throw error on existing user', async () => {
      userService.createUser.mockRejectedValue(new ConflictException());
      await expect(
        async () => await userController.createUser(validUser)
      ).rejects.toThrow(ConflictException);
    });
  });
});

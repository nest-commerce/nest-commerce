import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateUserDto,
  DeleteUserDto,
  FindUserDto,
  FindUsersResponseDto,
  UpdateUserDto,
  UserDto,
  FindUsersDto,
} from '@nest-commerce/data';
import { PasswordService } from '../auth/password/password.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  logger = new Logger(UserService.name);

  async findUser(findUserDto: FindUserDto): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: findUserDto,
    });
    return user ? new UserDto(user) : null;
  }

  async findUsers({
    page,
    pageSize,
    ...findUsersParams
  }: FindUsersDto): Promise<FindUsersResponseDto> {
    const [users, count] = await Promise.all([
      this.prisma.user.findMany({
        where: findUsersParams,
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
      this.prisma.user.count({ where: findUsersParams }),
    ]);
    return {
      users: users.map((user) => new UserDto(user)),
      count,
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await this.passwordService.hash(createUserDto.password),
      },
    });
    return new UserDto(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
    return new UserDto(user);
  }

  async deleteUser(deleteUserDto: DeleteUserDto) {
    const deletedUser = await this.prisma.user.delete({
      where: deleteUserDto,
    });
    return new UserDto(deletedUser);
  }

  async validateUser(
    username: string,
    password: string
  ): Promise<UserDto | null> {
    const user = await this.findUser({ username });
    if (user && (await this.passwordService.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}

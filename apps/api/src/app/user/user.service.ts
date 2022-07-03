import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateUserDto,
  UniqueUserDto,
  FindUsersResponseDto,
  UpdateUserDto,
  UserDto,
  FindUsersDto,
} from '@nest-commerce/data';
import { PasswordService } from '../auth/password/password.service';
import { Prisma, User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => PasswordService))
    private passwordService: PasswordService
  ) {}

  logger = new Logger(UserService.name);

  private toUserDto(user: User | null) {
    return plainToInstance(UserDto, user);
  }

  async findUser(findUserDto: UniqueUserDto): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: findUserDto,
    });
    return this.toUserDto(user);
  }

  async findUsers({
    page,
    pageSize,
    id,
    username,
    firstName,
    lastName,
  }: FindUsersDto): Promise<FindUsersResponseDto> {
    const searchParams: Prisma.UserWhereInput = {
      id,
      OR: [
        {
          username: { contains: username },
        },
        {
          firstName: { contains: firstName },
        },
        {
          lastName: { contains: lastName },
        },
      ],
    };

    const [users, count] = await Promise.all([
      this.prisma.user.findMany({
        where: searchParams,
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
      this.prisma.user.count({ where: searchParams }),
    ]);
    return {
      users: users.map((user) => this.toUserDto(user)),
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
    return this.toUserDto(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.update({
      data: updateUserDto,
      where: {
        id,
      },
    });
    return this.toUserDto(user);
  }

  async deleteUser(dto: UniqueUserDto) {
    const deletedUser = await this.prisma.user.delete({
      where: dto,
    });
    return this.toUserDto(deletedUser);
  }

  async validateUser(
    username: string,
    password: string
  ): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      return this.toUserDto(user);
    }
    return null;
  }
}

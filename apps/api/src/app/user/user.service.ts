import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto, FindUserDto, UserDto } from '@nest-commerce/data';
import { PasswordService } from '../auth/password/password.service';

const ERRORS_USER_ALREADY_EXIST = 'User already exists.';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService
  ) {}

  async findUser(findUserDto: FindUserDto): Promise<UserDto | null> {
    const user = await this.prisma.user.findUnique({
      where: findUserDto,
    });
    return user ? new UserDto(user) : null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.findUser({
      username: createUserDto.username,
    });
    if (existingUser) {
      throw new ConflictException(ERRORS_USER_ALREADY_EXIST);
    }
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await this.passwordService.hash(createUserDto.password),
      },
    });
    return new UserDto(user);
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

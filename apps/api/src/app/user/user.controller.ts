import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UniqueUserDto,
  FindUsersResponseDto,
  UpdateUserDto,
  UserDto,
  FindUsersDto,
} from '@nest-commerce/data';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt/jwt.guard';
import { PermissionsGuard } from '../auth/permissions/permissions.guard';
import { Permissions } from '../auth/permissions/permissions.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @UseGuards(JwtGuard, PermissionsGuard)
  @Permissions((user, { query }) =>
    query.id
      ? user.id.toString() === query.id
      : user.username === query.username
  )
  @Get()
  async findUser(@Query() findUserDto: UniqueUserDto): Promise<UserDto | null> {
    return this.userService.findUser(findUserDto);
  }

  @ApiOkResponse({
    type: FindUsersResponseDto,
  })
  @UseGuards(JwtGuard, PermissionsGuard)
  @Get('find')
  async findUsers(
    @Query() findUsersDto: FindUsersDto
  ): Promise<FindUsersResponseDto> {
    return this.userService.findUsers(findUsersDto);
  }

  @ApiCreatedResponse({
    type: UserDto,
  })
  @ApiConflictResponse()
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @ApiCreatedResponse({
    type: UserDto,
  })
  @ApiNotFoundResponse()
  @UseGuards(JwtGuard, PermissionsGuard)
  @Permissions((user, { params }) => user.id.toString() === params.id)
  @Post('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @ApiOkResponse({
    type: UserDto,
  })
  @ApiNotFoundResponse()
  @UseGuards(JwtGuard, PermissionsGuard)
  @Post('delete')
  async deleteUser(@Body() dto: UniqueUserDto): Promise<UserDto> {
    return this.userService.deleteUser(dto);
  }
}

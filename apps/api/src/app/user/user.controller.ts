import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, FindUserDto, UserDto } from '@nest-commerce/data';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({
    type: UserDto,
  })
  @UseGuards(JwtGuard)
  @Get()
  async findUser(@Query() param: FindUserDto): Promise<UserDto | null> {
    return this.userService.findUser(param);
  }

  @ApiCreatedResponse({
    type: UserDto,
  })
  @ApiConflictResponse()
  @Post('create')
  async createUser(@Body() body: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(body);
  }
}

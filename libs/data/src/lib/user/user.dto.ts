import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '../nest-decorators';

export class UserDto implements User {
  @IsInt()
  @ApiProperty({
    format: 'id',
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @IsEmail()
  @ApiProperty({
    format: 'email',
  })
  username: string;

  @IsString()
  @Exclude()
  password: string;

  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
  })
  role: Role;

  @IsDate()
  @ApiProperty({
    format: 'date-time',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    format: 'date-time',
  })
  updatedAt: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

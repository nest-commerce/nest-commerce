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
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements User {
  @IsInt()
  @IsNotEmpty()
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
  @IsNotEmpty()
  @ApiProperty({
    format: 'email',
  })
  username: string;

  @IsString()
  @Exclude()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({
    enum: Role,
  })
  role: Role;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    format: 'date-time',
  })
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    format: 'date-time',
  })
  updatedAt: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}

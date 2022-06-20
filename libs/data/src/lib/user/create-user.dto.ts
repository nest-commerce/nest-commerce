import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '../nest-decorators';

export class CreateUserDto {
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
  @IsNotEmpty()
  @ApiProperty({
    format: 'password',
    example: 'RandomP@ss123',
  })
  password: string;
}

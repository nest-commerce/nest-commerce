import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '../nest-decorators';

export class CredentialsDto {
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

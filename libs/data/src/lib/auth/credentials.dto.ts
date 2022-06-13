import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @IsEmail()
  @IsNotEmpty()
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

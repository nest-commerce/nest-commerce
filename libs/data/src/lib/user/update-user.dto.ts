import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '../nest-decorators';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({
    example: 'John',
  })
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({
    example: 'Doe',
  })
  lastName?: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    format: 'email',
  })
  username?: string;
}

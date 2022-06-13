import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResultDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  accessToken: string;
}

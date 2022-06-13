import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResultDto {
  @IsJWT()
  @IsNotEmpty()
  @ApiProperty()
  accessToken: string;
}

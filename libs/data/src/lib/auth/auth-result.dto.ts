import { IsEnum, IsJWT } from 'class-validator';
import { ApiProperty } from '../nest-decorators';
import { Role } from '@prisma/client';

export class AuthResultDto {
  @IsJWT()
  @ApiProperty()
  accessToken: string;

  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
  })
  role: string;
}

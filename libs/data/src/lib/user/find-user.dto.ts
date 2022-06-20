import { IsInt, IsEmail, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '../nest-decorators';

export class FindUserDto {
  @IsInt()
  @ValidateIf((o: FindUserDto) => !o.username)
  @ApiPropertyOptional({
    format: 'id',
  })
  id?: number;

  @IsEmail()
  @ValidateIf((o: FindUserDto) => !o.id)
  @ApiPropertyOptional({
    format: 'email',
  })
  username?: string;
}

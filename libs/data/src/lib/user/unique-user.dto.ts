import { IsInt, IsEmail, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '../nest-decorators';

export class UniqueUserDto {
  @IsInt()
  @ValidateIf((o: UniqueUserDto) => !o.username)
  @ApiPropertyOptional({
    format: 'id',
  })
  id?: number;

  @IsEmail()
  @ValidateIf((o: UniqueUserDto) => !o.id)
  @ApiPropertyOptional({
    format: 'email',
  })
  username?: string;
}

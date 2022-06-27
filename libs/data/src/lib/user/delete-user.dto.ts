import { IsInt, IsEmail, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '../nest-decorators';

export class DeleteUserDto {
  @IsInt()
  @ValidateIf((o: DeleteUserDto) => !o.username)
  @ApiPropertyOptional({
    format: 'id',
  })
  id?: number;

  @IsEmail()
  @ValidateIf((o: DeleteUserDto) => !o.id)
  @ApiPropertyOptional({
    format: 'email',
  })
  username?: string;
}

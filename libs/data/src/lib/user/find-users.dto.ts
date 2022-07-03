import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '../nest-decorators';
import { FindManyDto } from '../find-many.dto';

export class FindUsersDto extends FindManyDto {
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    format: 'id',
  })
  id?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    format: 'email',
  })
  username?: string;
}

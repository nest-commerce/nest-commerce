import { IsInt, IsEmail, IsString, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '../nest-decorators';
import { Type } from 'class-transformer';

export class FindUsersDto {
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

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional({
    format: 'email',
  })
  username?: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({
    default: 1,
  })
  page = 1;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({
    default: 10,
  })
  pageSize = 10;
}

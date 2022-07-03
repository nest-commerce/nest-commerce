import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from './nest-decorators';

export class FindManyDto {
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

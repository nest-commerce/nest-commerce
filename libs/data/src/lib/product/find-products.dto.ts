import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '../nest-decorators';
import { FindManyDto } from '../find-many.dto';

export class FindProductsDto extends FindManyDto {
  @IsInt()
  @IsOptional()
  @ApiProperty({
    format: 'id',
  })
  id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'First product',
  })
  name?: string;
}

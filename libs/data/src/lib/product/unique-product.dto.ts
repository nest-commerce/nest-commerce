import { IsInt } from 'class-validator';
import { ApiProperty } from '../nest-decorators';

export class UniqueProductDto {
  @IsInt()
  @ApiProperty({
    format: 'id',
  })
  id: number;
}

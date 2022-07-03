import { IsInt } from 'class-validator';
import { ApiProperty } from './nest-decorators';

export class FindManyResponseDto {
  @IsInt()
  @ApiProperty()
  count: number;
}

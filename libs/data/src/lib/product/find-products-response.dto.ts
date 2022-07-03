import { IsInstance } from 'class-validator';
import { FindManyResponseDto } from '../find-many-response.dto';
import { ProductDto } from './product.dto';
import { ApiProperty } from '../nest-decorators';

export class FindProductsResponseDto extends FindManyResponseDto {
  @IsInstance(ProductDto, {
    each: true,
  })
  @ApiProperty({
    type: [ProductDto],
  })
  products: ProductDto[];
}

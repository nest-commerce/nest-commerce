import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '../nest-decorators';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'First product',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => sanitizeHtml(value))
  @ApiProperty({
    example: 'Nice description',
  })
  description: string;
}

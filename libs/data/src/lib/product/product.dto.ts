import { Product } from '@prisma/client';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '../nest-decorators';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class ProductDto implements Product {
  @IsInt()
  @ApiProperty({
    format: 'id',
  })
  id: number;

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

  @IsDate()
  @ApiProperty({
    format: 'date-time',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    format: 'date-time',
  })
  updatedAt: Date;
}

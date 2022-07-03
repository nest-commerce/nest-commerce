import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { ApiPropertyOptional } from '../nest-decorators';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({
    example: 'First product',
  })
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => sanitizeHtml(value))
  @ApiPropertyOptional({
    example: 'Nice description',
  })
  description?: string;
}

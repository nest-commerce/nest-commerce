import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  CreateProductDto,
  FindProductsDto,
  FindProductsResponseDto,
  ProductDto,
  UniqueProductDto,
  UpdateProductDto,
} from '@nest-commerce/data';
import { ProductService } from './product.service';
import { PermissionsGuard } from '../auth/permissions/permissions.guard';
import { JwtGuard } from '../auth/jwt/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOkResponse({
    type: [ProductDto],
  })
  @Get('search')
  async searchProducts(@Query('search') searchTerm): Promise<ProductDto[]> {
    return this.productService.searchProducts(searchTerm);
  }

  @ApiOkResponse({
    type: ProductDto,
  })
  @Get()
  async findProduct(
    @Query() dto: UniqueProductDto
  ): Promise<ProductDto | null> {
    return this.productService.findProduct(dto);
  }

  @ApiOkResponse({
    type: FindProductsResponseDto,
  })
  @UseGuards(JwtGuard, PermissionsGuard)
  @Get('find')
  async findProducts(
    @Query() findProductsDto: FindProductsDto
  ): Promise<FindProductsResponseDto> {
    return this.productService.findProducts(findProductsDto);
  }

  @ApiCreatedResponse({
    type: ProductDto,
  })
  @UseGuards(JwtGuard, PermissionsGuard)
  @Post('create')
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ): Promise<ProductDto> {
    return this.productService.createProduct(createProductDto);
  }

  @ApiCreatedResponse({
    type: ProductDto,
  })
  @ApiNotFoundResponse()
  @UseGuards(JwtGuard, PermissionsGuard)
  @Post('update/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ProductDto> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @ApiOkResponse({
    type: ProductDto,
  })
  @ApiNotFoundResponse()
  @UseGuards(JwtGuard, PermissionsGuard)
  @Post('delete')
  async deleteProduct(@Body() dto: UniqueProductDto): Promise<ProductDto> {
    return this.productService.deleteProduct(dto);
  }
}

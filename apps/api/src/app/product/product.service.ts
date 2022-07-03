import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import {
  CreateProductDto,
  FindProductsDto,
  FindProductsResponseDto,
  ProductDto,
  UniqueProductDto,
  UpdateProductDto,
} from '@nest-commerce/data';
import { Prisma, Product } from '@prisma/client';
import { ISearchService } from '../search/search.interface';
import { SearchIndex } from '../types/search-index.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    @Inject('ISearchService')
    private searchService: ISearchService
  ) {}

  private toProductDto(product: Product | null) {
    return plainToInstance(ProductDto, product);
  }

  async findProduct(
    findProductDto: UniqueProductDto
  ): Promise<ProductDto | null> {
    const product = await this.prisma.product.findUnique({
      where: findProductDto,
    });
    return this.toProductDto(product);
  }

  async findProducts({
    page,
    pageSize,
    id,
    name,
  }: FindProductsDto): Promise<FindProductsResponseDto> {
    const searchParams: Prisma.ProductWhereInput = {
      id,
      name: { contains: name },
    };
    const [products, count] = await Promise.all([
      this.prisma.product.findMany({
        where: searchParams,
        take: pageSize,
        skip: (page - 1) * pageSize,
      }),
      this.prisma.product.count({ where: searchParams }),
    ]);
    return {
      products: products.map((product) => this.toProductDto(product)),
      count,
    };
  }

  async createProduct(data: CreateProductDto): Promise<ProductDto> {
    const product = await this.prisma.product.create({
      data,
    });
    await this.searchService.addToIndex(SearchIndex.PRODUCTS, [product]);
    return this.toProductDto(product);
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<ProductDto> {
    const product = await this.prisma.product.update({
      where: { id },
      data,
    });
    return this.toProductDto(product);
  }

  async deleteProduct(dto: UniqueProductDto): Promise<ProductDto> {
    const deletedProduct = await this.prisma.product.delete({
      where: dto,
    });
    return this.toProductDto(deletedProduct);
  }

  async searchProducts(searchTerm: string): Promise<ProductDto[]> {
    const products = await this.searchService.search(
      SearchIndex.PRODUCTS,
      searchTerm
    );
    return products.map((product) => this.toProductDto(product));
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductModule } from './product.module';
import { PrismaService } from 'nestjs-prisma';
import { Product } from '@prisma/client';
import {
  CreateProductDto,
  FindProductsDto,
  ProductDto,
  UniqueProductDto,
  UpdateProductDto,
} from '@nest-commerce/data';
import { SearchIndex } from '../types/search-index.enum';

describe('ProductService', () => {
  let service: ProductService;

  const prismaService = {
    product: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const searchService = {
    addToIndex: jest.fn(),
    search: jest.fn(),
  };

  const validProduct: Product = {
    id: 1,
    name: 'test',
    description: 'test',
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .overrideProvider('ISearchService')
      .useValue(searchService)
      .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findProduct', () => {
    it('should return product as ProductDto', async () => {
      prismaService.product.findUnique.mockResolvedValueOnce(validProduct);
      const params = { id: 1 };
      const result = await service.findProduct(params);
      expect(result).toEqual(validProduct);
      expect(result).toBeInstanceOf(ProductDto);
      expect(prismaService.product.findUnique).toBeCalledWith({
        where: params,
      });
    });

    it('should return null when product not found', async () => {
      prismaService.product.findUnique.mockResolvedValueOnce(null);
      const params = { id: 1 };
      const result = await service.findProduct(params);
      expect(result).toEqual(null);
      expect(prismaService.product.findUnique).toBeCalledWith({
        where: params,
      });
    });
  });

  describe('findProducts', () => {
    it('should return products as ProductDto and count', async () => {
      const count = 1;
      prismaService.product.findMany.mockResolvedValueOnce([validProduct]);
      prismaService.product.count.mockResolvedValueOnce(count);
      const params = new FindProductsDto();
      const result = await service.findProducts(params);
      expect(result).toEqual({ products: [validProduct], count });
      result.products.forEach((res) => expect(res).toBeInstanceOf(ProductDto));
      expect(result.count).toEqual(count);
    });

    it('should return empty array when no products found', async () => {
      const count = 0;
      const expected = [];
      prismaService.product.findMany.mockResolvedValueOnce(expected);
      prismaService.product.count.mockResolvedValueOnce(count);
      const params = new FindProductsDto();
      const result = await service.findProducts(params);
      expect(result).toEqual({ products: expected, count });
      expect(result.count).toEqual(count);
    });
  });

  describe('createProduct', () => {
    it('should create product and return as ProductDto', async () => {
      prismaService.product.create.mockReturnValueOnce(validProduct);
      const result = await service.createProduct({
        id: 1,
      } as unknown as CreateProductDto);
      expect(result).toEqual(validProduct);
      expect(result).toBeInstanceOf(ProductDto);
      expect(searchService.addToIndex).toHaveBeenCalledWith(
        SearchIndex.PRODUCTS,
        [validProduct]
      );
    });
  });

  describe('updateProduct', () => {
    it('should update product and return as ProductDto', async () => {
      prismaService.product.update.mockReturnValueOnce(validProduct);
      const result = await service.updateProduct(1, {
        id: 1,
      } as unknown as UpdateProductDto);
      expect(result).toEqual(validProduct);
      expect(result).toBeInstanceOf(ProductDto);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product and return as ProductDto', async () => {
      prismaService.product.delete.mockReturnValueOnce(validProduct);
      const result = await service.deleteProduct({
        id: 1,
      } as unknown as UniqueProductDto);
      expect(result).toEqual(validProduct);
      expect(result).toBeInstanceOf(ProductDto);
    });
  });

  describe('searchProducts', () => {
    it('should search for products and return as ProductDtos', async () => {
      searchService.search.mockResolvedValueOnce([validProduct]);
      const searchTerm = 'test';
      const result = await service.searchProducts(searchTerm);
      expect(result[0]).toEqual(validProduct);
      expect(result[0]).toBeInstanceOf(ProductDto);
      expect(searchService.search).toHaveBeenCalledWith(
        SearchIndex.PRODUCTS,
        searchTerm
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { DbSearchService } from './db-search.service';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { SearchIndex } from '../../types/search-index.enum';

describe('DbSearchService', () => {
  let service: DbSearchService;

  const prismaService = {
    product: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [DbSearchService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    service = module.get<DbSearchService>(DbSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    const getSearchParams = (searchTerm: string) => ({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });

    it('should search for products when index is products', async () => {
      const expectedResult = [{ id: 0 }];
      const searchTerm = 'test';
      prismaService.product.findMany.mockResolvedValueOnce(expectedResult);
      const actualResult = await service.search(
        SearchIndex.PRODUCTS,
        searchTerm
      );
      expect(actualResult).toEqual(expectedResult);
      expect(prismaService.product.findMany).toHaveBeenCalledWith(
        getSearchParams(searchTerm)
      );
    });

    it('should search for products when index is products and empty search term', async () => {
      const expectedResult = [{ id: 0 }];
      prismaService.product.findMany.mockResolvedValueOnce(expectedResult);
      const actualResult = await service.search(SearchIndex.PRODUCTS);
      expect(actualResult).toEqual(expectedResult);
      expect(prismaService.product.findMany).toHaveBeenCalledTimes(1);
      expect(prismaService.product.findMany).toHaveBeenCalledWith(
        getSearchParams('')
      );
    });

    it('should return empty array if index is unknown', async () => {
      const actualResult = await service.search('test' as SearchIndex, 'test');
      expect(actualResult).toEqual([]);
      expect(prismaService.product.findMany).not.toHaveBeenCalled();
    });
  });
});

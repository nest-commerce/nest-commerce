import { Injectable } from '@nestjs/common';
import { ISearchService } from '../search.interface';
import { PrismaService } from 'nestjs-prisma';
import { Product } from '@prisma/client';
import { SearchIndex } from '../../types/search-index.enum';
import { SearchIndexType } from '../../types/search-index.type';

@Injectable()
export class DbSearchService implements ISearchService {
  constructor(private prismaService: PrismaService) {}

  // No index for DB service
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addToIndex<T extends SearchIndex>(
    index: T,
    documents: SearchIndexType<T>[]
  ) {
    return;
  }

  async search<T extends SearchIndex>(
    index: T,
    searchTerm = ''
  ): Promise<SearchIndexType<T>[]> {
    if (index !== SearchIndex.PRODUCTS) {
      return [];
    }
    const result = await this.searchProducts(searchTerm);
    return result as SearchIndexType<T>[];
  }

  private async searchProducts(searchTerm: string): Promise<Product[]> {
    return this.prismaService.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
        ],
      },
    });
  }
}

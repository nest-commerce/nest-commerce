import { Injectable, Logger } from '@nestjs/common';
import { MeiliSearch } from 'meilisearch';
import { ConfigService } from '@nestjs/config';
import { ISearchService } from '../search.interface';
import { SearchIndex } from '../../types/search-index.enum';
import { SearchIndexType } from '../../types/search-index.type';

export const CONFIG_KEY_MEILI_URL = 'MEILI_URL';
const CONFIG_KEY_MEILI_KEY = 'MEILI_MASTER_KEY';

export const ERROR_INDEXING = (index: string) =>
  `Unable to add to index (${index}):`;
export const ERROR_SEARCH = 'Unable to fetch results:';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

@Injectable()
export class MeiliSearchService implements ISearchService {
  private readonly instance: MeiliSearch;
  private readonly logger = new Logger(MeiliSearchService.name);

  constructor(private configService: ConfigService) {
    this.instance = new MeiliSearch({
      host: configService.getOrThrow(CONFIG_KEY_MEILI_URL),
      apiKey: configService.getOrThrow(CONFIG_KEY_MEILI_KEY),
    });
  }

  async addToIndex<T extends SearchIndex>(
    index: T,
    documents: SearchIndexType<T>[]
  ) {
    try {
      await this.instance
        .index<SearchIndexType<T>>(index)
        .addDocuments(documents);
    } catch (e) {
      this.logger.error(ERROR_INDEXING(index), e);
    }
  }

  async search<T extends SearchIndex>(
    index: T,
    searchTerm: string,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE
  ): Promise<SearchIndexType<T>[]> {
    try {
      const searchIndex = this.instance.index<SearchIndexType<T>>(index);
      const results = await searchIndex.search<SearchIndexType<T>>(searchTerm, {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      return results.hits;
    } catch (e) {
      this.logger.error(ERROR_SEARCH, e);
      return [];
    }
  }
}

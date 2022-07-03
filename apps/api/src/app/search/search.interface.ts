import { SearchIndexType } from '../types/search-index.type';
import { SearchIndex } from '../types/search-index.enum';

export interface ISearchService {
  addToIndex<T extends SearchIndex>(
    index: SearchIndex,
    documents: SearchIndexType<T>[]
  ): void;
  search<T extends SearchIndex>(
    index: T,
    searchTerm: string,
    page?: number,
    pageSize?: number
  ): Promise<SearchIndexType<T>[]>;
}

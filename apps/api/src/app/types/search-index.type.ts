import { SearchIndex } from './search-index.enum';
import { Product } from '@prisma/client';

export type SearchIndexType<T extends SearchIndex> =
  T extends SearchIndex.PRODUCTS ? Product : never;

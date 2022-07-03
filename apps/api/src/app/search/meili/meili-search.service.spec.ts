import { Test, TestingModule } from '@nestjs/testing';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  ERROR_INDEXING,
  ERROR_SEARCH,
  MeiliSearchService,
} from './meili-search.service';
import { ConfigService } from '@nestjs/config';
import { SearchIndex } from '../../types/search-index.enum';
import { Product } from '@prisma/client';

describe('MeiliService', () => {
  let service: MeiliSearchService;

  const mockAddDocumentsFn = jest.fn();
  const mockSearchFn = jest.fn();
  const mockIndexFn = jest.fn();
  const mockLogger = {
    error: jest.fn(),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    mockIndexFn.mockReturnValue({
      addDocuments: mockAddDocumentsFn,
      search: mockSearchFn,
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, MeiliSearchService],
    }).compile();

    service = module.get<MeiliSearchService>(MeiliSearchService);
    service = Object.assign(service, {
      instance: { index: mockIndexFn },
      logger: mockLogger,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addToIndex', () => {
    it('should retrieve index and add documents', async () => {
      const index = SearchIndex.PRODUCTS;
      const documents = [{ id: 1 }];
      await service.addToIndex(index, documents as Product[]);
      expect(mockIndexFn).toHaveBeenCalledWith(index);
      expect(mockAddDocumentsFn).toHaveBeenCalledWith(documents);
    });

    it('should log but not throw error', async () => {
      const index = SearchIndex.PRODUCTS;
      const documents = [{ id: 1 }];
      const error = 'test';
      mockAddDocumentsFn.mockRejectedValueOnce(error);
      await service.addToIndex(index, documents as Product[]);
      expect(mockIndexFn).toHaveBeenCalledWith(index);
      expect(mockAddDocumentsFn).toHaveBeenCalledWith(documents);
      expect(mockLogger.error).toHaveBeenCalledWith(
        ERROR_INDEXING(index),
        error
      );
    });
  });

  describe('search', () => {
    const getSearchOptions = (
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE
    ) => ({ limit: pageSize, offset: (page - 1) * pageSize });

    it('should retrieve index and perform search with default pagination', async () => {
      const index = SearchIndex.PRODUCTS;
      const documents = [{ id: 1 }];
      const searchTerm = 'test';
      mockSearchFn.mockResolvedValueOnce({ hits: documents });
      const results = await service.search(index, searchTerm);
      expect(results).toEqual(documents);
      expect(mockIndexFn).toHaveBeenCalledWith(index);
      expect(mockSearchFn).toHaveBeenCalledWith(searchTerm, getSearchOptions());
    });

    it('should retrieve index and perform search with pagination input', async () => {
      const index = SearchIndex.PRODUCTS;
      const documents = [{ id: 1 }];
      const searchTerm = 'test';
      const page = 2;
      const pageSize = 20;
      mockSearchFn.mockResolvedValueOnce({ hits: documents });
      const results = await service.search(index, searchTerm, page, pageSize);
      expect(results).toEqual(documents);
      expect(mockIndexFn).toHaveBeenCalledWith(index);
      expect(mockSearchFn).toHaveBeenCalledWith(
        searchTerm,
        getSearchOptions(page, pageSize)
      );
    });

    it('should log error and return empty array', async () => {
      const index = SearchIndex.PRODUCTS;
      const searchTerm = 'test';
      const error = 'error';
      mockSearchFn.mockRejectedValueOnce(error);
      const results = await service.search(index, searchTerm);
      expect(results).toEqual([]);
      expect(mockIndexFn).toHaveBeenCalledWith(index);
      expect(mockSearchFn).toHaveBeenCalledWith(searchTerm, getSearchOptions());
      expect(mockLogger.error).toHaveBeenCalledWith(ERROR_SEARCH, error);
    });
  });
});

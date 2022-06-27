import { PrismaExceptionFilter } from './prisma-exception.filter';
import { Prisma } from '@prisma/client';
import { ArgumentsHost, HttpStatus } from '@nestjs/common';

describe('PrismaExceptionFilter', () => {
  let prismaExceptionFilter: PrismaExceptionFilter;

  const getRequestFn = jest.fn();
  const jsonFn = jest.fn();
  const statusFn = jest.fn().mockReturnValue({ json: jsonFn });

  const host = {
    switchToHttp: jest.fn().mockReturnValue({
      getResponse: jest.fn().mockReturnValue({
        status: statusFn,
        json: jsonFn,
      }),
      getRequest: getRequestFn,
    }),
  };

  beforeEach(() => {
    prismaExceptionFilter = new PrismaExceptionFilter();
  });

  it('should be defined', () => {
    expect(prismaExceptionFilter).toBeDefined();
  });

  describe('catch', () => {
    it('should return conflict status when exception code is P2002', () => {
      getRequestFn.mockReturnValueOnce({ url: '/api/user' });
      const mockException = {
        code: 'P2002',
      };
      prismaExceptionFilter.catch(
        mockException as Prisma.PrismaClientKnownRequestError,
        host as unknown as ArgumentsHost
      );
      expect(statusFn).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    });

    test.each([
      {
        code: 'P2025',
        meta: {
          cause: 'Record not found',
        },
      },
      {
        code: 'P2025',
      },
    ])(
      'should return not found status when exception code is P2025',
      (mockException) => {
        getRequestFn.mockReturnValueOnce({ url: '/api/user' });
        prismaExceptionFilter.catch(
          mockException as unknown as Prisma.PrismaClientKnownRequestError,
          host as unknown as ArgumentsHost
        );
        expect(statusFn).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      }
    );

    it('should return internal server exception when exception code is unknown', () => {
      getRequestFn.mockReturnValueOnce({ url: '/api/user' });
      const mockException = {
        code: 'P1000',
      };
      prismaExceptionFilter.catch(
        mockException as unknown as Prisma.PrismaClientKnownRequestError,
        host as unknown as ArgumentsHost
      );
      expect(statusFn).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { capitalize } from '@nrwl/workspace/src/utils/strings';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const [status, message] = this.processError(exception, request.url);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  private processError(
    exception: Prisma.PrismaClientKnownRequestError,
    path: string
  ): [number, string] {
    switch (exception.code) {
      case 'P2002': {
        const message = `${this.getEntityName(path)} already exists.`;
        return [HttpStatus.CONFLICT, message];
      }
      case 'P2025': {
        const message = (exception.meta?.cause as string)?.replace(
          'Record',
          this.getEntityName(path)
        );
        return [HttpStatus.NOT_FOUND, message];
      }
      default: {
        this.logger.error(exception);
        return [HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong.'];
      }
    }
  }

  private getEntityName = (path: string) => {
    const matches = path.match(/^\/api\/(\w*)/);
    const entityName = matches ? matches[1] : path;
    return capitalize(entityName);
  };
}

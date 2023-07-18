import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  BadRequestException,
  HttpException,
  NotFoundException,
  ForbiddenException,
  NotAcceptableException,
  ConflictException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ForbiddenError } from '../errors/ForbiddenError';
import { NotAcceptableError } from '../errors/NotAcceptableError';
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { isPrismaError } from '../errors/prisma/factory/isPrismaError';
import { handleDatabaseErrors } from '../errors/prisma/factory/handleDatabaseErrors';
import { UniqueConstraintError } from '../errors/prisma/UniqueConstraintError';
import { DatabaseError } from '../errors/DatabaseError';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof BadRequestException) {
          throw new BadRequestException(error?.getResponse());
        }

        if (error instanceof UnauthorizedError) {
          throw new UnauthorizedException(error.message);
        }

        if (error instanceof NotFoundError) {
          throw new NotFoundException(error.message);
        }

        if (error instanceof ForbiddenError) {
          throw new ForbiddenException(error.message);
        }

        if (error instanceof NotAcceptableError) {
          throw new NotAcceptableException(error.message);
        }

        if (error instanceof ConflictError) {
          throw new ConflictException(error.message);
        }

        if (isPrismaError(error)) {
          error = handleDatabaseErrors(error);

          if (error instanceof UniqueConstraintError) {
            throw new ConflictException(error.message);
          }

          if (error instanceof DatabaseError) {
            throw new HttpException(
              { message: 'Database error', ...error },
              500,
              {
                cause: new Error(),
              },
            );
          }
        }

        // if (
        //   error instanceof PrismaClientKnownRequestError ||
        //   error instanceof PrismaClientUnknownRequestError
        // ) {
        //   throw new HttpException(
        //     { message: 'Database error', ...error },
        //     500,
        //     {
        //       cause: new Error(),
        //     },
        //   );
        // }

        throw new HttpException({ message: 'External Error', ...error }, 500, {
          cause: new Error(),
        });
      }),
    );
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  ConflictException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { isPrismaError } from '../errors/prisma/factory/isPrismaError';
import { handleDatabaseErrors } from '../errors/prisma/factory/handleDatabaseErrors';
import { UniqueConstraintError } from '../errors/prisma/UniqueConstraintError';
import { DatabaseError } from '../errors/DatabaseError';

@Injectable()
export class PrismaErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
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

        throw error;
      }),
    );
  }
}

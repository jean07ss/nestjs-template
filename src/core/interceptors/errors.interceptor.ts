import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  BadRequestException,
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

        throw error;
      }),
    );
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { UnauthorizedError } from '../errors/UnauthorizedError';

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

        throw new HttpException({ message: 'External Error', ...error }, 500, {
          cause: new Error(),
        });
      }),
    );
  }
}

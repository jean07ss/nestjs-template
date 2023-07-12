import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { AwsError } from '../errors/AwsError';

@Injectable()
export class UnauthorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        console.log(error)

        // if (error instanceof UnauthorizedError) {
        //   throw new HttpException('message', HttpStatus.EARLYHINTS, {cause: error})
        // }

        throw new Error()
      }),
    );
  }
}

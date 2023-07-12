import { Injectable } from '@nestjs/common';
import { UnauthorizedError } from './core/errors/UnauthorizedError';
import { AwsError } from './core/errors/AwsError';

@Injectable()
export class AppService {
  async getHello(): Promise<any>  {
    const [a, b] = await Promise.all([this.teste1(), this.teste2()]);
    return {a, b}
  }

  async teste1() {
    console.log('a')
    throw new UnauthorizedError();
  }

  async teste2() {
    console.log('b')
    throw new UnauthorizedError();
  }
}

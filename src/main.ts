import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedInterceptor } from './core/interceptors/unauthorized.interceptor copy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  // app.useGlobalInterceptors(new DatabaseInterceptor());
  await app.listen(3000);
}
bootstrap();

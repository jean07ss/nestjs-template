import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ErrorsInterceptor } from './core/interceptors/errors.interceptor';
import { PrismaErrorsInterceptor } from './core/interceptors/prisma-errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(
    new ErrorsInterceptor(),
    new PrismaErrorsInterceptor()
  );

  const config = new DocumentBuilder()
    .setTitle('Swagger Template Example')
    .setDescription(
      'The purpose of the template is to be a base to facilitate the development of backend applications in Nest.',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

import { cookiesConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser(cookiesConfig.secret));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  await app.listen(AppModule.port);
}
bootstrap();

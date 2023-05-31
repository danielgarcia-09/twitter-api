
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { cookiesConfig } from './config';
import './prototypes';
import { MainSocket } from './socket';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser(cookiesConfig.secret));
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    skipMissingProperties: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  await app.listen(AppModule.port);
  new MainSocket();
}
bootstrap();



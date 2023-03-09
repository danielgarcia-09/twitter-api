import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
// somewhere in your initialization file
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser(AppModule.cookie_secret));
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

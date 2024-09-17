import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Transform } from 'class-transformer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  app.enableCors({
    origin: 'https://www.museappofficial.com/', 
    methods: 'GET, POST, PUT, DELETE', // Specify allowed methods
    credentials: true, // Allow cookies or authorization headers
  });

  await app.listen(3000);
}

bootstrap();

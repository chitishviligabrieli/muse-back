import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import "dotenv/config"
import { Transform } from 'class-transformer';
import { RolesGuard } from './auth/guard/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  app.enableCors();

  await app.listen(3000);
}

bootstrap();

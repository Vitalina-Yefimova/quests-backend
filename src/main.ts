import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.enableCors({
    origin: 'http://localhost:5173', // front
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use('/images', express.static(join(process.cwd(), 'public', 'images')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();




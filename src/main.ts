import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.use(cookieParser())
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  const jwtGuard = app.get(JwtAuthGuard);
  app.useGlobalGuards(jwtGuard);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();




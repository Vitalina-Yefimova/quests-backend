import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
  }),
  ConfigModule.forRoot({
    isGlobal: true, // делает переменные окружения доступными в любом месте приложения
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule { }

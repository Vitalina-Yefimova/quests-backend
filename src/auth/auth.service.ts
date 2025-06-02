import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { AuthResponse } from './interfaces/auth-response.interface';
import { LoginPayload } from './interfaces/login-payload.interface';
import { AuthUser } from './interfaces/auth-user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(data: AuthPayload): Promise<AuthResponse> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email },
        { phone: data.phone },
        { username: data.username },
        ]
      }
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 — это "salt rounds" (число раундов соль-перемешивания), которое указывает, сколько раз будет применён алгоритм хеширования к паролю при создании хэша

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        phone: data.phone
      },
    });

    return {
      access_token: this.jwtService.sign({ sub: user.id })
    }
  }
  async validateUser(data: LoginPayload): Promise<AuthUser> {
    const isEmail = data.login.includes('@');
    const user = await this.prisma.user.findUnique({ where: isEmail ? { email: data.login } : { username: data.login } })

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return { id: user.id }
  }

  async login(user: AuthUser): Promise<AuthResponse> {
    return { access_token: this.jwtService.sign({ sub: user.id }) }
  }
}
import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly prisma: PrismaService) { }

  @Post('register')
  async register(@Body() dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const data = await this.authService.register(dto)
    return new RegisterResponseDto(data.access_token)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto> {
    const data = await this.authService.login(req.user);
    return new LoginResponseDto(data.access_token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  check(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    console.log('REQ.USER:', req.user);
    return this.prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, username: true, email: true },
    });
  }
}
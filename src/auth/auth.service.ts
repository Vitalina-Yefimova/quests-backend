import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpRequest } from './interfaces';
import { SignInResponse } from './interfaces';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) { }

  async signUp(data: SignUpRequest): Promise<SignInResponse> {
    const existingUser = await this.usersService.getUser({
      email: data.email,
      phone: data.phone,
    })

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.usersService.createUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      verify: false,
    });

    const verifyToken = this.jwtService.sign(
      {
        sub: user.id,
        type: 'verify'
      },
    );

    await this.emailService.sendVerifyEmail(user.email, verifyToken)

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        role: user.role
      })
    }
  }

  async validatePassword(email: string, password: string): Promise<{ id: number, role: string }> {
    const user = await this.usersService.getUser({ email })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }

  async signIn(user: {
    email: string;
    password: string;
  }): Promise<SignInResponse> {

    const userData = await this.validatePassword(user.email, user.password)
    return {

      access_token: this.jwtService.sign({
        sub: userData.id,
        role: userData.role,
      })
    }
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const userId = payload.sub;

      await this.usersService.updateUser(userId, {
        verify: true,
      })

      return { message: 'User verified successfully' };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token')
    }
  }
}

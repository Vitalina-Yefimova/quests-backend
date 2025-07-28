import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpSendRequest, SignInRequest, SignUpRequest } from './interfaces';
import { SignInResponse } from './interfaces';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SmsService } from 'src/sms/sms.service';
import { SmsResponse } from 'src/sms/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Otp, OtpDocument } from 'src/mongo-schemas/otp.schema';
import { Model } from 'mongoose';
import { OtpVerifyRequest } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private smsService: SmsService,
    @InjectModel(Otp.name)
    private readonly otpModel: Model<OtpDocument>,
  ) { }

  async signUp(data: SignUpRequest): Promise<{ email: string }> {
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
    });

    return { email: user.email }
  }

  async validatePassword(email: string, password: string): Promise<{ id: number, role: string }> {
    const user = await this.usersService.getUser({ email })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }

  async signIn(user: SignInRequest): Promise<SignInResponse> {

    const userData = await this.validatePassword(user.email, user.password)

    const token = this.jwtService.sign({
      sub: userData.id,
      role: userData.role,
    })
    return {
      access_token: token
    }
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      if (payload.type !== 'verify') {
        throw new BadRequestException('Invalid token type');
      }

      const userId = payload.sub;
      const user = await this.usersService.getUser({ id: userId });

      if (!user) {
        throw new BadRequestException('User not found');
      }
      if (user.verify) {
        return {
          message: 'Email already verified'
        }
      }

      await this.usersService.updateUser(userId, {
        verify: true,
      })

      return {
        access_token: this.jwtService.sign({
          sub: user.id,
          role: user.role,
        }),
      };
    } catch (error) {
      throw new BadRequestException('Invalid or expired token')
    }
  }

  async sendOtp(data: OtpSendRequest): Promise<SmsResponse> {
    const { phone } = data;


    const code = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.otpModel.create({
      phone,
      code,
      expiresAt,
      attempts: 0,
    });

    const message = `Your verification code is: ${code}`;
    await this.smsService.sendSms(phone, message)

    return { phone };
  }

  async verifyOtp(data: OtpVerifyRequest): Promise<{ access_token: string }> {
    const { phone, code } = data;

    const receivedCode = await this.otpModel
      .findOne({ phone })
      .sort({ createdAt: -1 });

    if (
      !receivedCode ||
      receivedCode.code !== code ||
      receivedCode.expiresAt < new Date()
      || receivedCode.attempts >= 3
    ) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.otpModel.deleteOne({ _id: receivedCode._id });

    let user = await this.usersService.getUser({ phone })

    if (!user) {
      user = await this.usersService.createUser({
        phone,
        verify: true,
      });
    }

    const access_token = this.jwtService.sign({
      sub: user.id,
      role: user.role,
    })

    return { access_token }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);
      if (payload.type !== 'reset') {
        throw new BadRequestException('Invalid token type');
      }

      const user = await this.usersService.getUser({ id: payload.sub });
      if (!user) throw new BadRequestException('User not found');

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.usersService.updateUser(user.id, {
        password: hashedPassword,
        isHashedPassword: true,
      });

      return { message: 'Password updated successfully' };
    } catch {
      throw new BadRequestException('Invalid or expired token');
    }
  }
}




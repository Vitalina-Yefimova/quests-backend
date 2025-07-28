import { Controller, Post, Body, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { SmsRequestDto } from 'src/sms/dto/sms-request.dto';
import { SmsResponseDto } from 'src/sms/dto/sms-response.dto';
import { OtpVerifyRequestDto } from './dto/otp-verify-request.dto';
import { OtpSendRequestDto } from './dto/otp-send-request.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('sign-up')
  async signUp(@Body() dto: SignUpRequestDto): Promise<{ email: string }> {
    return await this.authService.signUp(dto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() dto: SignInRequestDto): Promise<SignInResponseDto> {

    const data = await this.authService.signIn(dto);
    return new SignInResponseDto(data.access_token);
  }

  @Public()
  @Post('verify')
  async verify(@Headers('authorization') authHeader: string) {
    const token = authHeader?.replace('Bearer ', '');
    return this.authService.verifyEmail(token);
  }

  @Public()
  @Post('send-otp')
  async sendOtp(
    @Body() dto: OtpSendRequestDto): Promise<SmsResponseDto> {
    return this.authService.sendOtp(dto)
  }

  @Public()
  @Post('verify-otp')
  async verifyOtp(
    @Body() dto: OtpVerifyRequestDto) {
    return this.authService.verifyOtp(dto)
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; password: string }) {
    return this.authService.resetPassword(body.token, body.password)
  }
}

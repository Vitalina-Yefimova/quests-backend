import { Controller, Post, Body, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { Public } from 'src/common/decorators/public.decorator';


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
}

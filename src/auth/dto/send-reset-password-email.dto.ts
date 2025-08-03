import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SendResetPasswordEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  frontendUrl: string;
} 
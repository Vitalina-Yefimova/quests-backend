import { IsNotEmpty, IsString } from 'class-validator';
import { SignInRequest } from '../interfaces';

export class SignInRequestDto implements SignInRequest {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

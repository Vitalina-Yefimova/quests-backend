import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { SignUpRequest } from '../interfaces';

export class SignUpRequestDto implements SignUpRequest {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+1[0-9]{10}$/, {
    message: 'Phone number must be valid'
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  frontendUrl: string;
}

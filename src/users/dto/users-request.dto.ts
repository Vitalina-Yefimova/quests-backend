import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches, MinLength, IsEnum } from "class-validator";
import { UsersRequest } from '../interfaces';

export class UsersRequestDto implements UsersRequest {

  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: 'Phone number must be a valid phone number'
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  role: 'USER' | 'ADMIN'

  @IsBoolean()
  verify?: boolean;

  @IsBoolean()
  emailVerified?: boolean;

  @IsString()
  newEmail?: string

  @IsEnum(['email', 'phone'])
  authMethod: 'email' | 'phone';
}

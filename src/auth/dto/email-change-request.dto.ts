import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EmailChangeRequest } from '../interfaces';


export class EmailChangeRequestDto implements EmailChangeRequest {
  @IsEmail()
  newEmail: string;

  @IsString()
  @IsNotEmpty()
  frontendUrl: string;
}

import { IsEmail, IsString } from "class-validator";
import { EmailRequest } from "../interfaces";

export class EmailRequestDto implements EmailRequest {

  @IsEmail()
  email: string;

  @IsString()
  frontendUrl: string;

  @IsString()
  type: string;
}
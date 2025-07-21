import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { SmsRequest } from "../interfaces";

export class SmsRequestDto implements SmsRequest {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}


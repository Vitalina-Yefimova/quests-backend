import { IsNotEmpty, IsPhoneNumber, Length } from "class-validator";
import { OtpVerifyRequest } from "../interfaces";

export class OtpVerifyRequestDto implements OtpVerifyRequest {

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}
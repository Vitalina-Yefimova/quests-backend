import { IsNotEmpty, Length, IsString, Matches } from "class-validator";
import { OtpVerifyRequest } from "../interfaces";

export class OtpVerifyRequestDto implements OtpVerifyRequest {

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+1[0-9]{10}$/, {
    message: 'Phone number must be valid'
  })
  phone: string;

  @IsNotEmpty()
  @Length(6, 6)
  code: number;
}
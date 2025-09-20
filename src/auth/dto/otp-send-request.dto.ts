import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { OtpSendRequest } from '../interfaces';

export class OtpSendRequestDto implements OtpSendRequest {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+1[0-9]{10}$/, {
    message: 'Phone number must be valid'
  })
  phone: string;
}

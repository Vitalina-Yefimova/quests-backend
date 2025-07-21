import { IsString, IsNotEmpty } from 'class-validator';
import { OtpSendRequest } from '../interfaces';

export class OtpSendRequestDto implements OtpSendRequest {
  @IsString()
  @IsNotEmpty()
  phone: string;
}

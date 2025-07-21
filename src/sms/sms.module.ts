import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from '../mongo-schemas/otp.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule { }
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Otp {
  @Prop({ required: true }) phone: string;
  @Prop({ required: true }) code: number;
  @Prop({ required: true }) expiresAt: Date;
  @Prop({ required: true }) attempts: number;
}

export type OtpDocument = Otp & Document;
export const OtpSchema = SchemaFactory.createForClass(Otp);

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class OTP extends Document {
  @Prop()
  userID: string;

  @Prop()
  otp: number;

  @Prop()
  expiresAt: Date;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);

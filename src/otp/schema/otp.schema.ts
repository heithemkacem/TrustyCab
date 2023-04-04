import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class OTP extends Document {
  @Prop()
  userID: mongoose.Types.ObjectId;

  @Prop()
  otp: string;

  @Prop()
  expiresAt: Date;
}

export const OTPSchema = SchemaFactory.createForClass(OTP);

import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OTPSchema } from './schema/otp.schema';
import { MailModule } from 'src/mail/mail.module';
import { UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: 'OTP', schema: OTPSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [OtpService],
  controllers: [OtpController],
})
export class OtpModule {}

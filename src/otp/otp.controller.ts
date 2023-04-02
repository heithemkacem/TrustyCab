import { Body, Controller, Post, Req } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private OTPService: OtpService) {}
  @Post('verify')
  verifyOTP(@Body() { userID, otp }): Promise<any> {
    return this.OTPService.verifyOTP(userID, otp);
  }
  @Post('resend')
  resendOTP(@Body() { userID }): Promise<any> {
    return this.OTPService.resendOTP(userID);
  }
  @Post('verify-modify-password')
  verifyModifyPasswordOTP(@Body() { userID, otp }): Promise<any> {
    return this.OTPService.verifyOTPModifyPassword(userID, otp);
  }
  @Post('verify-modify-password-resend')
  modifyPasswordResendOTP(@Body() { userID }): Promise<any> {
    return this.OTPService.modifyPasswordResendOTP(userID);
  }
}

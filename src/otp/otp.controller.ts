import { Body, Controller, Post, Req } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CustomError } from 'src/error-handler/error-handler';

@Controller('otp')
export class OtpController {
  constructor(private OTPService: OtpService) {}
  @Post('verify')
  verifyOTP(@Body() { userID, otp }): Promise<CustomError> {
    return this.OTPService.verifyOTP(userID, otp);
  }
  @Post('resend')
  resendOTP(@Body() { userID }): Promise<CustomError> {
    return this.OTPService.resendOTP(userID);
  }
  @Post('verify-modify-password')
  verifyModifyPasswordOTP(@Body() { userID, otp }): Promise<CustomError> {
    return this.OTPService.verifyOTPModifyPassword(userID, otp);
  }
  @Post('verify-modify-password-resend')
  modifyPasswordResendOTP(@Body() { userID }): Promise<CustomError> {
    return this.OTPService.modifyPasswordResendOTP(userID);
  }
}

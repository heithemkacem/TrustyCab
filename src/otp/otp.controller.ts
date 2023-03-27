import { Body, Controller, Post, Req } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private OTPService: OtpService) {}
}

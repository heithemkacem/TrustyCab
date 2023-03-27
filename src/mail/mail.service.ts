import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmationEmail(email: string, otp: number) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to TrustyCab App! Confirm your Email',
      html: `<h1>Hi there!</h1> 
      <p>Thanks for signing up for TrustyCab App. We're excited to have you on board.</p>
      <p>Please confirm your email address by entering the following OTP:</p>
      <h2>${otp}</h2>
      <p>Thanks,</p>
      <p>TrustyCab Team</p>`,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, isValidObjectId } from 'mongoose';
import { OTP } from './schema/otp.schema';
import { User } from 'src/auth/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import * as OTPGenerator from 'otp-generator';
import { MailService } from 'src/mail/mail.service';
import { CustomError } from 'src/error-handler/error-handler';
@Injectable()
export class OtpService {
  constructor(
    @InjectModel(OTP.name)
    private otpModel: Model<OTP>,

    @InjectModel(User.name)
    private userModel: Model<User>,

    private mailService: MailService,
  ) {}
  //!create an otp record
  async createOTPRecord(_id: mongoose.Types.ObjectId): Promise<string> {
    const otp = OTPGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
    //hash the unique string
    const hashedOTP = await bcrypt.hash(otp, 10);
    //set values in userVerification collection
    this.otpModel.create({
      userID: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 300000,
    });
    console.log('OTP: ', typeof otp, otp);
    return otp;
  }
  //!send-otp to email for verification
  async sendOTPVerificationEmail({ _id, email }): Promise<CustomError> {
    const OTPRecord = await this.createOTPRecord(_id);
    await this.mailService.sendUserConfirmationEmail(email, OTPRecord);
    return {
      status: 'Success',
      message: 'OTP has been sent to your email',
    };
  }
  async sendOTPModifyPassword({ _id, email }): Promise<CustomError> {
    const OTPRecord = await this.createOTPRecord(_id);
    await this.mailService.sendOTPForgetPasswordEmail(email, OTPRecord);
    return {
      status: 'Success',
      message: 'OTP to modify your password has been sent to your email',
    };
  }
  //!verify-modify-password
  async verifyOTPModifyPassword(
    userID: mongoose.Types.ObjectId,
    otp: string,
  ): Promise<CustomError> {
    if (!otp || !userID) {
      return {
        status: 'Failed',
        message: 'Empty details are not allowed',
      };
      //Empty details are not allowed
    }
    if (!isValidObjectId(userID)) {
      return {
        status: 'Failed',
        message: 'Not a valid UserId',
      };
    }
    const existingRecord = await this.otpModel.findOne({ userID: userID });
    if (existingRecord !== null) {
      const expiresAt = existingRecord.expiresAt;
      const hashedOTP = existingRecord.otp;
      var currentTime = new Date();
      if (expiresAt < currentTime) {
        //OTP has expired
        return {
          status: 'Failed',
          message: 'OTP has expired',
        };
      } else {
        //!Valid record exist
        const matchString = await bcrypt.compare(otp, hashedOTP);
        //todo Strings match
        if (matchString) {
          //transform id to integer
          await this.otpModel.findOneAndDelete({ userID: userID });
          return {
            status: 'Success',
            message: 'You can set your new password now',
          };
        } else {
          //OTP does not match
          return {
            status: 'Failed',
            message: 'OTP does not match',
          };
        }
      }
      //No record found
    }
  }

  //!verify
  async verifyOTP(
    userID: mongoose.Types.ObjectId,
    otp: string,
  ): Promise<CustomError> {
    if (!otp || !userID) {
      //Empty details are not allowed
      return {
        status: 'Failed',
        message: 'Empty details are not allowed',
      };
    } else if (!isValidObjectId(userID)) {
      return {
        status: 'Failed',
        message: 'Not a valid UserId',
      };
    } else {
      //transfor userId to a integer
      const existingRecord = await this.otpModel.findOne({ userID: userID });
      if (existingRecord != null) {
        //todo User Verification Record Exist So We Procced
        const expiresAt = existingRecord.expiresAt;
        const hashedOTP = existingRecord.otp;
        //get the current time
        var currentTime = new Date();
        if (expiresAt < currentTime) {
          //!Record has expired
          await this.otpModel.findOneAndDelete({ userID: userID });
          return {
            status: 'Failed',
            message: 'OTP has expired',
          };
        } else {
          //!Valid record exist
          //?Comparing the unique string
          const matchString = await bcrypt.compare(otp, hashedOTP);
          //todo Strings match
          if (matchString) {
            await this.otpModel.findOneAndDelete({ userID: userID });
            const fetchedUser = await this.userModel.find({ _id: userID });

            if (fetchedUser != null) {
              await this.userModel.updateOne(
                { _id: userID },
                { verified: true },
              );
              return {
                status: 'Success',
                message: 'You account has been verified',
              };
            } else {
              return {
                status: 'Failed',
                message: 'User does not exist',
              };
            }
          } else {
            return {
              status: 'Failed',
              message: 'Invalid verification details passed',
            };

            //"Invalid verification details passed"
          }
        }
      } else {
        return {
          status: 'Failed',
          message: 'Account reccord doesnt exist',
        };
        //Account reccord doesnt exist signup or login
      }
    }
  }

  //!resend OTP Function
  async resendOTP(userID: mongoose.Types.ObjectId): Promise<CustomError> {
    if (!userID) {
      return {
        status: 'Failed',
        message: 'Empty details are not allowed',
      };
    } else if (!isValidObjectId(userID)) {
      return {
        status: 'Failed',
        message: 'Not a valid UserId',
      };
    } else {
      // delete existing records and resend
      await this.otpModel.deleteMany({ userID: userID });
      const user = await this.userModel.findById(userID);
      if (user.verified) {
        return {
          status: 'Failed',
          message: 'Account has already been verified',
        };
      }
      await this.sendOTPVerificationEmail(user);
      return {
        status: 'Success',
        message: 'OTP has been resent',
      };
    }
  }

  //!resend OTP Function
  async modifyPasswordResendOTP(
    userID: mongoose.Types.ObjectId,
  ): Promise<CustomError> {
    if (!userID) {
      return {
        status: 'Failed',
        message: 'Empty details are not allowed',
      };
    } else if (!isValidObjectId(userID)) {
      return {
        status: 'Failed',
        message: 'Not a valid UserId',
      };
    } else {
      // delete existing records and resend
      await this.otpModel.deleteMany({ userID: userID });
      const user = await this.userModel.findById(userID);
      if (!user.verified) {
        return {
          status: 'Failed',
          message: 'Account is not verified',
        };
      }
      await this.sendOTPModifyPassword(user);
      return {
        status: 'Success',
        message: 'OTP has been resent',
      };
    }
  }
}

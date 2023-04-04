import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ResetDto } from './dto/reset.dto';
import { ForgetDto } from './dto/forget.dto';
import { OtpService } from 'src/otp/otp.service';
import {
  CustomError,
  UserLoginTokenMessage,
  UserSuccessMessage,
  UserVerificationMessage,
} from 'src/error-handler/error-handler';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}
  //!Get User
  async getUser(id: mongoose.Types.ObjectId): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }
  //!Get User By Email
  async getUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  //!Sign Up
  async signUp(
    signUpDto: SignUpDto,
  ): Promise<CustomError | UserSuccessMessage> {
    const { fullName, phone, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAleardyExist = await this.getUserByEmail(email);
    if (userAleardyExist == null) {
      const user = await this.userModel.create({
        fullName,
        phone,
        email,
        password: hashedPassword,
        verified: false,
      });
      await this.otpService.sendOTPVerificationEmail(user);
      return {
        status: 'Success',
        message: 'Your account has been created successfully',
        user: user,
      };
    } else {
      return {
        status: 'Failed',
        message: 'User aleardy exist',
      };
    }
  }
  //!Login
  async login(
    loginDto: LoginDto,
  ): Promise<CustomError | UserVerificationMessage | UserLoginTokenMessage> {
    const { email, password } = loginDto;
    const user = await this.getUserByEmail(email);

    if (user == null) {
      return {
        status: 'Failed',
        message: 'Invalid email or password',
      };
    } else {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return {
          status: 'Failed',
          message: 'Invalid email or password',
        };
      } else {
        if (user.verified == false) {
          await this.otpService.sendOTPVerificationEmail(user);
          return {
            status: 'Verify',
            message: 'Please verify your email',
            userID: user._id,
          };
        } else {
          const token = this.jwtService.sign({
            id: user._id,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
          });

          return {
            status: 'Success',
            message: 'Login successfully',
            token: token,
          };
        }
      }
    }
  }
  //!Forget Password
  async forgetPassword(
    forgetDto: ForgetDto,
  ): Promise<CustomError | UserVerificationMessage> {
    const { email } = forgetDto;

    const user = await this.getUserByEmail(email);

    if (!user) {
      return { status: 'Failed', message: 'Invalid email' };
    }
    if (user.verified == false) {
      return { status: 'Verify', message: 'Please verify your email' };
    }
    await this.otpService.sendOTPModifyPassword(user);
    return {
      status: 'Success',
      message: 'Password reset otp sent to your email',
      userID: user._id,
    };
  }
  //!Reset Password
  async resetPassword(resetDto: ResetDto): Promise<CustomError> {
    const { id, password, confirmPassword } = resetDto;
    if (password !== confirmPassword) {
      return { status: 'Failed', message: 'Password not matched' };
    }
    const user = await this.getUser(id);

    if (!user) {
      return { status: 'Failed', message: 'Invalid email' };
    }
    if (user.verified == false) {
      return { status: 'Verify', message: 'Please verify your email' };
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (isPasswordMatched) {
      return { status: 'Failed', message: 'Password aleardy exist' };
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      return { status: 'Success', message: 'Password reset successfully' };
    }
  }
}

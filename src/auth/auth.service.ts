import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ResetDto } from './dto/reset.dto';
import { ForgetDto } from './dto/forget.dto';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,

    private otpService: OtpService,
  ) {}
  //!Get User
  async getUser(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }
  //!Get User By Email
  async getUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  //!Sign Up
  async signUp(signUpDto: SignUpDto): Promise<any> {
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
        message: 'User created successfully',
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
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.getUserByEmail(email);

    if (user == null) {
      return {
        status: 'Failed',
        message: 'Invalid email or password',
      };
    } else {
      if (user.verified == false) {
        return {
          status: 'Verify',
          message: 'Please verify your email',
        };
      } else {
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          return {
            status: 'Failed',
            message: 'Invalid email or password',
          };
        }

        const token = this.jwtService.sign({ id: user._id });
        return {
          status: 'Success',
          message: 'Login successfully',
          token,
        };
      }
    }
  }
  //!Forget Password
  async forgetPassword(forgetDto: ForgetDto): Promise<any> {
    const { email } = forgetDto;

    const user = await this.getUserByEmail(email);

    if (!user) {
      return { status: 'Failed', message: 'Invalid email' };
    }
    return {
      status: 'Success',
      message: 'Password reset otp sent to your email',
    };
  }
  //!Reset Password
  async resetPassword(resetDto: ResetDto): Promise<any> {
    const { id, password, confirmPassword } = resetDto;
    if (password !== confirmPassword) {
      return { status: 'Failed', message: 'Password not matched' };
    }
    const user = await this.getUser(id);

    if (!user) {
      return { status: 'Failed', message: 'Invalid email' };
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (isPasswordMatched) {
      return { status: 'Failed', message: 'Password aleardy exist' };
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
    }
    return { status: 'Success', message: 'Password reset successfully' };
  }
}

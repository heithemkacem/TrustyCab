import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ResetDto } from './dto/reset.dto';
import { ForgetDto } from './dto/forget.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  //!Get User
  async getUser(id: string): Promise<any> {
    const user = await this.userModel.findById({ _id: id });
    if (!user) {
      return { status: 'Failed', message: 'Invalid user' };
    }
    return user;
  }
  //!Get User By Email
  async getUserByEmail(email: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return { status: 'Failed', message: 'Invalid user' };
    }
    return user;
  }
  //!Sign Up
  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { fullName, phone, email, password } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userAleardyExist = await this.getUserByEmail(email);
    if (userAleardyExist) {
      return {
        status: 'Failed',
        message: 'User aleardy exist',
      };
    }
    const user = await this.userModel.create({
      fullName,
      phone,
      email,
      password: hashedPassword,
    });

    return {
      status: 'Success',
      message: 'User created successfully',
      fullname: fullName,
    };
  }
  //!Login
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.getUserByEmail(email);

    if (!user) {
      return {
        status: 'Failed',
        message: 'Invalid email or password',
      };
    }

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

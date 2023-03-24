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

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { fullName, phone, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userAleardyExist = await this.userModel.findOne({ email });

    if (userAleardyExist) {
      throw new UnauthorizedException('Email aleardy in use');
    }
    const user = await this.userModel.create({
      fullName,
      phone,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
  async forgetPassword(forgetDto: ForgetDto): Promise<{ user: boolean }> {
    const { email } = forgetDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      return { user: false };
    }
    return { user: true };
  }
  async resetPassword(resetDto: ResetDto): Promise<{ user: boolean }> {
    const { id, password, confirmPassword } = resetDto;
    if (password !== confirmPassword) {
      throw new UnauthorizedException('Password not matched');
    }
    const user = await this.userModel.findById({ _id: id });

    if (!user) {
      throw new UnauthorizedException('Invalid user id');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (isPasswordMatched) {
      throw new UnauthorizedException('Password aleardy in use');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
    }
    return { user: true };
  }
}

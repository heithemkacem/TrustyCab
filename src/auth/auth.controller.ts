import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgetDto } from './dto/forget.dto';
import { LoginDto } from './dto/login.dto';
import { ResetDto } from './dto/reset.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
  @Post('/forget-password')
  forget(@Body() forgetDto: ForgetDto): Promise<{ user: boolean }> {
    return this.authService.forgetPassword(forgetDto);
  }
  @Post('/reset-password')
  reset(@Body() resetDto: ResetDto): Promise<{ user: boolean }> {
    return this.authService.resetPassword(resetDto);
  }
}

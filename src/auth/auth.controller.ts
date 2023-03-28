import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgetDto } from './dto/forget.dto';
import { LoginDto } from './dto/login.dto';
import { ResetDto } from './dto/reset.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<any> {
    //show the loginDto in the console
    return this.authService.login(loginDto);
  }
  @Post('/forget-password')
  forget(@Body() forgetDto: ForgetDto): Promise<any> {
    return this.authService.forgetPassword(forgetDto);
  }
  @Post('/reset-password')
  reset(@Body() resetDto: ResetDto): Promise<any> {
    return this.authService.resetPassword(resetDto);
  }
}

import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
}

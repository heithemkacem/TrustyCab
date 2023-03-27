import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly userID: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(6)
  @MaxLength(6)
  readonly otp: number;

  @IsDate()
  expiresAt: Date;
}

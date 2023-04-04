import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import mongoose from 'mongoose';

export class ResetDto {
  //check also for _Id in the user model
  @IsNotEmpty()
  @IsString()
  readonly id: mongoose.Types.ObjectId;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(24)
  readonly confirmPassword: string;
}

import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetDto {
  //check also for _Id in the user model
  @IsNotEmpty()
  @IsString()
  readonly id: string;
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
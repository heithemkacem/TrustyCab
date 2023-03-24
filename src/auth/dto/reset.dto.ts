import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetDto {
  //check also for _Id in the user model
  @IsNotEmpty()
  @IsString()
  readonly id: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly confirmPassword: string;
}

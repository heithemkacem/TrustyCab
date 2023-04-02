import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class ReviewTaxiBannerDTO {
  @IsNotEmpty()
  @IsString()
  readonly taxiBanner: string;
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  @IsPositive()
  readonly reviewScore: number;
}

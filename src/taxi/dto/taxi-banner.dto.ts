import { IsNotEmpty, IsString } from 'class-validator';

export class TaxiBannerDTO {
  @IsNotEmpty()
  @IsString()
  readonly taxiBanner: string;
}

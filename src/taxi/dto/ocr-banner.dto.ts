import { IsNotEmpty, IsString } from 'class-validator';

export class OCRBannerDTO {
  @IsNotEmpty()
  @IsString()
  readonly base64Image: string;
}

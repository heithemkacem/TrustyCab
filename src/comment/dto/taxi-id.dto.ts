import { IsNotEmpty, IsString } from 'class-validator';

export class TaxiIdDTO {
  @IsNotEmpty()
  @IsString()
  readonly taxiId: string;
}

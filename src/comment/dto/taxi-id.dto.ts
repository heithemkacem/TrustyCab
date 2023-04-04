import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class TaxiIdDTO {
  @IsNotEmpty()
  @IsString()
  readonly taxiId: mongoose.Types.ObjectId;
}

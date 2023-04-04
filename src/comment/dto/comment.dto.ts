import { IsNotEmpty, IsString } from 'class-validator';
import mongoose, { ObjectId } from 'mongoose';

export class CommentDTO {
  @IsNotEmpty()
  @IsString()
  readonly comment: string;
  @IsNotEmpty()
  @IsString()
  readonly showUser: boolean;
  @IsNotEmpty()
  readonly taxiId: mongoose.Types.ObjectId;
  @IsNotEmpty()
  readonly user: mongoose.Types.ObjectId;
}

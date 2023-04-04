import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class ReplyDTO {
  @IsNotEmpty()
  @IsString()
  readonly comment: string;
  @IsNotEmpty()
  @IsString()
  readonly showUser: boolean;
  @IsNotEmpty()
  readonly commentId: mongoose.Types.ObjectId;
}

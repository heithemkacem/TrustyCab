import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CommentDTO {
  @IsNotEmpty()
  @IsString()
  readonly comment: string;
  @IsNotEmpty()
  @IsString()
  readonly showUser: boolean;
  @IsNotEmpty()
  readonly taxiId: ObjectId;
  @IsNotEmpty()
  readonly user: ObjectId;
}

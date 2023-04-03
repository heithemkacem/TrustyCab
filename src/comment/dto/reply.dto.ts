import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyDTO {
  @IsNotEmpty()
  @IsString()
  readonly comment: string;
  @IsNotEmpty()
  @IsString()
  readonly showUser: boolean;
  @IsNotEmpty()
  readonly commentId: string;
}

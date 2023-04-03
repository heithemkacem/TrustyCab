import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  @IsString()
  readonly comment: string;
  @IsNotEmpty()
  @IsString()
  readonly showUser: boolean;
}

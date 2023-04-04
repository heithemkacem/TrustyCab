import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDTO } from './dto/comment.dto';
import { ReplyDTO } from './dto/reply.dto';
import { Public } from 'src/auth/public.decorator';
import { TaxiIdDTO } from './dto/taxi-id.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}
  @Post()
  @UseGuards(AuthGuard())
  async createComment(
    @Body()
    commentDTO: CommentDTO,
    //get user id from token payload and add it to the reviewTaxiBannerDTO object
    @Req() req,
  ) {
    const id = req.user.id;
    return await this.commentService.createComment(commentDTO, id);
  }
  @Post('reply')
  @UseGuards(AuthGuard())
  async replyToComment(
    @Body()
    replyDTO: ReplyDTO,
    //get user id from token payload and add it to the reviewTaxiBannerDTO object
    @Req() req,
  ) {
    const id = req.user.id;
    return await this.commentService.replyToComment(replyDTO, id);
  }
  @Post('get-taxi-comments')
  @Public()
  async getTaxiComments(
    @Body()
    taxiIdDTO: TaxiIdDTO,
    //get user id from token payload and add it to the reviewTaxiBannerDTO object
  ) {
    return await this.commentService.getTaxiComments(taxiIdDTO);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Comment } from './schema/comment.schema';
import { CommentDTO } from './dto/comment.dto';
import { ReplyDTO } from './dto/reply.dto';
import { Taxi } from 'src/taxi/schema/taxi.schema';
import { TaxiIdDTO } from './dto/taxi-id.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
    @InjectModel(Taxi.name)
    private taxiModel: Model<Taxi>,
  ) {}
  async createComment(commentDTO: CommentDTO, userId: string) {
    const isValidID = isValidObjectId(userId);
    if (!isValidID) {
      return {
        status: 'Failed',
        message: 'Invalid user id',
      };
    }
    const { comment, showUser, taxiId } = commentDTO;
    const isValidTaxiID = isValidObjectId(taxiId);
    if (!isValidTaxiID) {
      return {
        status: 'Failed',
        message: 'Invalid taxi id',
      };
    }

    const newComment = new this.commentModel({
      comment,
      showUser,
      user: userId,
      taxiId,
    });
    const savedComment = await newComment.save();
    return {
      status: 'Success',
      message: 'Comment created successfully',
      data: savedComment,
    };
  }
  async replyToComment(replyDTO: ReplyDTO, userId) {
    //check if the user id is valid
    const isValidID = isValidObjectId(userId);
    if (!isValidID) {
      return {
        status: 'Failed',
        message: 'Invalid user id',
      };
    }
    //check if the comment id is valid
    const { comment, showUser, commentId } = replyDTO;
    const isValidCommentID = isValidObjectId(commentId);
    if (!isValidCommentID) {
      return {
        status: 'Failed',
        message: 'Invalid comment id',
      };
    }
    //check if the comment exists
    const exsitingComment = await this.commentModel.findById(commentId);
    if (!exsitingComment) {
      return {
        status: 'Failed',
        message: 'Comment not found',
      };
    }

    //add the reply to the comment
    exsitingComment.replies.push({
      user: userId,
      comment,
      showUser,
    });
    //save the comment
    const savedComment = await exsitingComment.save();
    return {
      status: 'Success',
      message: 'Reply created successfully',
      data: savedComment,
    };
  }
  async getTaxiComments(taxiIdDTO: TaxiIdDTO) {
    const { taxiId } = taxiIdDTO;
    //check if the taxi id is valid
    const isValidTaxiID = isValidObjectId(taxiId);
    if (!isValidTaxiID) {
      return {
        status: 'Failed',
        message: 'Invalid taxi id',
      };
    }
    //check if the taxi exists
    const existingTaxi = await this.taxiModel.findById(taxiId);
    if (!existingTaxi) {
      return {
        status: 'Failed',
        message: 'Taxi not found',
      };
    }
    //return the array of comments
    const exsitingComments = await this.commentModel.find({ taxiId: taxiId });
    return {
      status: 'Success',
      message: 'Comments fetched successfully',
      data: exsitingComments,
    };
  }
}

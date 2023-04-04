import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Taxi } from 'src/taxi/schema/taxi.schema';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Taxi' })
  taxiId: Taxi;
  @Prop()
  comment: string;
  @Prop()
  showUser: boolean;
  //define a prop for the user who created the comment
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  //define a prop for the list of users who will reply to the comment that contain the user id and a the comment they wrote
  @Prop({
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String,
        showUser: Boolean,
        date: { type: Date, default: Date.now },
      },
    ],
  })
  replies: [{ user: Types.ObjectId; comment: string; showUser: boolean }];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

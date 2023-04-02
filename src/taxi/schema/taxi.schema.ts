import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Taxi {
  @Prop()
  taxiBanner: string;

  @Prop()
  score: number;

  //define a prop for the user who created the taxi
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  //define a prop for the list of users who will rate the taxi driver after the ride that contain the user id and a the score they gave to the driver
  @Prop({
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        score: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  })
  reviwers: [{ user: Types.ObjectId; score: number }];
}

export const TaxiSchema = SchemaFactory.createForClass(Taxi);

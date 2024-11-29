import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
@Schema()
export class Review {
  @Prop()
  comment: string;

  @Prop()
  rate: number;

  @Prop()
  userId: ObjectId;

  @Prop()
  productId: ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

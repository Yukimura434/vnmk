import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class Cart {
  @Prop()
  userId: Types.ObjectId;

  @Prop()
  productId: Types.ObjectId;

  @Prop()
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

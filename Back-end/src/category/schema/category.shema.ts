import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  availabilityStatus: string;

  @Prop()
  order: number;

  @Prop()
  menuId: ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

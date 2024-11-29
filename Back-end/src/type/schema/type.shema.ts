import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class Type {
  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId })
  categoryId: Types.ObjectId;

  @Prop({ default: '' })
  image: string;
}

export const TypeSchema = SchemaFactory.createForClass(Type);

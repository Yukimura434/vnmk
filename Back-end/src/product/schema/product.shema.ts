import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop({ default: [''] })
  images: string[];

  @Prop()
  description: string;

  @Prop()
  descriptionFull: string;

  @Prop()
  originalPrice: number;

  @Prop()
  salePrice: number;

  @Prop()
  keyCount: number;

  @Prop()
  modes: number;

  @Prop()
  color: string;

  @Prop()
  movementType: string;

  @Prop()
  batteryCapacity: number;

  @Prop()
  switchType: string;

  @Prop()
  caseMatetial: string;

  @Prop()
  multiLayout: string;

  @Prop({ type: Types.ObjectId })
  typeId: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

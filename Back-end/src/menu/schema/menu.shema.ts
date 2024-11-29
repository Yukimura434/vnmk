import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class Menu {
  @Prop()
  name: string;

  @Prop()
  order: number;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);

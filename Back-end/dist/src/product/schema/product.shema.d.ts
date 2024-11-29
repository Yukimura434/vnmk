import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';
export declare class Product extends Document {
    name: string;
    images: string[];
    description: string;
    descriptionFull: string;
    originalPrice: number;
    salePrice: number;
    keyCount: number;
    modes: number;
    color: string;
    movementType: string;
    batteryCapacity: number;
    switchType: string;
    caseMatetial: string;
    multiLayout: string;
    typeId: Types.ObjectId;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, Document<unknown, any, Product> & Product & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, Document<unknown, {}, mongoose.FlatRecord<Product>> & mongoose.FlatRecord<Product> & Required<{
    _id: unknown;
}>>;

import { Document, Types } from 'mongoose';
export declare class Type {
    name: string;
    categoryId: Types.ObjectId;
    image: string;
}
export declare const TypeSchema: import("mongoose").Schema<Type, import("mongoose").Model<Type, any, any, any, Document<unknown, any, Type> & Type & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Type, Document<unknown, {}, import("mongoose").FlatRecord<Type>> & import("mongoose").FlatRecord<Type> & {
    _id: Types.ObjectId;
}>;

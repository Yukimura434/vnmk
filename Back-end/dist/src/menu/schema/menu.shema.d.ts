import { Document, Types } from 'mongoose';
export declare class Menu {
    name: string;
    order: number;
}
export declare const MenuSchema: import("mongoose").Schema<Menu, import("mongoose").Model<Menu, any, any, any, Document<unknown, any, Menu> & Menu & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Menu, Document<unknown, {}, import("mongoose").FlatRecord<Menu>> & import("mongoose").FlatRecord<Menu> & {
    _id: Types.ObjectId;
}>;

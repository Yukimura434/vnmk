import { Model } from 'mongoose';
import { Type } from '../schema/type.shema';
import { CreateTypeDto } from '../dto/CreateType.dto';
export declare class TypeRepository {
    private typeModel;
    constructor(typeModel: Model<Type>);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getTypesByCategoryId(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findById(typeId: string): Promise<import("mongoose").Document<unknown, {}, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(typeId: string): Promise<import("mongoose").Document<unknown, {}, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateImage(typeId: string, imageUrl: string): Promise<import("mongoose").Document<unknown, {}, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(typeId: string, createTypeDto: CreateTypeDto): Promise<import("mongoose").Document<unknown, {}, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(data: any): Promise<import("mongoose").Document<unknown, {}, Type> & Type & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

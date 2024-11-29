import { TypeRepository } from '../repository/type.repository';
import { CreateTypeDto } from '../dto/CreateType.dto';
import { Types } from 'mongoose';
export declare class TypeService {
    private typeRepository;
    constructor(typeRepository: TypeRepository);
    getAllType(): Promise<(import("mongoose").Document<unknown, {}, import("../schema/type.shema").Type> & import("../schema/type.shema").Type & {
        _id: Types.ObjectId;
    })[]>;
    getTypesByCategoryId(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schema/type.shema").Type> & import("../schema/type.shema").Type & {
        _id: Types.ObjectId;
    })[]>;
    deleteType(typeId: string): Promise<{
        message: string;
    }>;
    updateType(typeId: string, createTypeDto: CreateTypeDto): Promise<{
        message: string;
    }>;
    updateImage(typeId: string, imageUrl: string): Promise<{
        message: string;
    }>;
    createType(createTypeDto: CreateTypeDto): Promise<{
        message: string;
    }>;
}

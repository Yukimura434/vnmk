import { TypeService } from './service/type.service';
import { CreateTypeDto } from './dto/CreateType.dto';
export declare class TypeController {
    private readonly typeService;
    constructor(typeService: TypeService);
    createType(createTypeDto: CreateTypeDto): Promise<{
        message: string;
    }>;
    updateType(typeId: string, updateTypeDto: CreateTypeDto): Promise<{
        message: string;
    }>;
    deleteType(typeId: string): Promise<{
        message: string;
    }>;
    getAllType(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/type.shema").Type> & import("./schema/type.shema").Type & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getTypeBycategoryId(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/type.shema").Type> & import("./schema/type.shema").Type & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}

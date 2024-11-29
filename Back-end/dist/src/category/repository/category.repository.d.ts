import { Model } from 'mongoose';
import { Category } from '../schema/category.shema';
import { CreateCategoryDto } from '../dto/CreateCategory.dto';
export declare class CategoryRepository {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    findByAvailabilityStatus(availabilityStatus: string): Promise<any[]>;
    findById(categoryId: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(data: any): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    delete(categoryId: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(categoryId: string, createCategoryDto: CreateCategoryDto): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

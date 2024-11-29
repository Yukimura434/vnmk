import { CategoryRepository } from '../repository/category.repository';
import { CreateCategoryDto } from '../dto/CreateCategory.dto';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    getAllCategory(): Promise<(import("mongoose").Document<unknown, {}, import("../schema/category.shema").Category> & import("../schema/category.shema").Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getCategoryByAvailabilityStatus(availabilityStatus: string): Promise<any[]>;
    deleteCategory(categoryId: string): Promise<import("mongoose").Document<unknown, {}, import("../schema/category.shema").Category> & import("../schema/category.shema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateCategory(categoryId: string, createCategoryDto: CreateCategoryDto): Promise<import("mongoose").Document<unknown, {}, import("../schema/category.shema").Category> & import("../schema/category.shema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
    }>;
}

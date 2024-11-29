import { CategoryService } from './service/category.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        message: string;
    }>;
    getAllCategory(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/category.shema").Category> & import("./schema/category.shema").Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getCategoryByAvailabilityStatus(availabilityStatus: string): Promise<any[]>;
    deleteCategory(categoryId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/category.shema").Category> & import("./schema/category.shema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateCategory(categoryId: string, createCategoryDto: CreateCategoryDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/category.shema").Category> & import("./schema/category.shema").Category & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

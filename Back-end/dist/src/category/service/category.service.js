"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("../repository/category.repository");
const mongodb_1 = require("mongodb");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async getAllCategory() {
        return await this.categoryRepository.getAll();
    }
    async getCategoryByAvailabilityStatus(availabilityStatus) {
        return await this.categoryRepository.findByAvailabilityStatus(availabilityStatus);
    }
    async deleteCategory(categoryId) {
        return await this.categoryRepository.delete(categoryId);
    }
    async updateCategory(categoryId, createCategoryDto) {
        const categoryExist = await this.categoryRepository.findById(categoryId);
        if (!categoryExist) {
            throw new Error('Category not found');
        }
        try {
            const updatedCategory = await this.categoryRepository.update(categoryId, createCategoryDto);
            if (!updatedCategory) {
                throw new Error('Failed to update category');
            }
            return updatedCategory;
        }
        catch (error) {
            console.error('Error updating category:', error);
            throw new Error('An error occurred while updating the category');
        }
    }
    async createCategory(createCategoryDto) {
        try {
            const menuIdObjectId = new mongodb_1.ObjectId(createCategoryDto.menuId);
            const newMenu = { ...createCategoryDto, menuId: menuIdObjectId };
            console.log('newMenu :', newMenu);
            const Newcategory = await this.categoryRepository.create(newMenu);
            return {
                message: 'Create category success',
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('Create category error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_shema_1 = require("../schema/category.shema");
let CategoryRepository = class CategoryRepository {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async findByAvailabilityStatus(availabilityStatus) {
        return await this.categoryModel.aggregate([
            {
                $match: { availabilityStatus: availabilityStatus },
            },
            {
                $lookup: {
                    from: 'types',
                    localField: '_id',
                    foreignField: 'categoryId',
                    as: 'type',
                },
            },
        ]);
    }
    async findById(categoryId) {
        return await this.categoryModel.findById(categoryId);
    }
    async getAll() {
        return await this.categoryModel.find();
    }
    async create(data) {
        return this.categoryModel.create(data);
    }
    async delete(categoryId) {
        return await this.categoryModel.findByIdAndDelete(categoryId);
    }
    async update(categoryId, createCategoryDto) {
        return await this.categoryModel.findByIdAndUpdate(categoryId, createCategoryDto, { new: true });
    }
};
exports.CategoryRepository = CategoryRepository;
exports.CategoryRepository = CategoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_shema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryRepository);
//# sourceMappingURL=category.repository.js.map
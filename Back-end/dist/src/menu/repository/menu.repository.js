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
exports.MenuRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const menu_shema_1 = require("../schema/menu.shema");
let MenuRepository = class MenuRepository {
    constructor(menuModel) {
        this.menuModel = menuModel;
    }
    async create(createMenuDto) {
        return await this.menuModel.create(createMenuDto);
    }
    async deleteMenuById(menuId) {
        return await this.menuModel.findByIdAndDelete(menuId);
    }
    async findAll() {
        return this.menuModel
            .aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: '_id',
                    foreignField: 'menuId',
                    as: 'categories',
                },
            },
            {
                $unwind: {
                    path: '$categories',
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $lookup: {
                    from: 'types',
                    localField: 'categories._id',
                    foreignField: 'categoryId',
                    as: 'categories.types',
                },
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    order: { $first: '$order' },
                    categories: { $push: '$categories' },
                },
            },
            {
                $sort: { order: 1 },
            },
        ])
            .exec();
    }
    async findById(menuId) {
        return await this.menuModel.findById(menuId);
    }
    async updateMenu(menuId, updateMenuDto) {
        return await this.menuModel.findByIdAndUpdate(menuId, updateMenuDto, {
            new: true,
        });
    }
};
exports.MenuRepository = MenuRepository;
exports.MenuRepository = MenuRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(menu_shema_1.Menu.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MenuRepository);
//# sourceMappingURL=menu.repository.js.map
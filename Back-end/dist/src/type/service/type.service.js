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
exports.TypeService = void 0;
const common_1 = require("@nestjs/common");
const type_repository_1 = require("../repository/type.repository");
const mongoose_1 = require("mongoose");
let TypeService = class TypeService {
    constructor(typeRepository) {
        this.typeRepository = typeRepository;
    }
    async getAllType() {
        return await this.typeRepository.getAll();
    }
    async getTypesByCategoryId(categoryId) {
        return await this.typeRepository.getTypesByCategoryId(categoryId);
    }
    async deleteType(typeId) {
        const type = await this.typeRepository.findById(typeId);
        if (!type) {
            throw new common_1.HttpException('Type not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.typeRepository.delete(typeId);
        return {
            message: 'Delete type success',
        };
    }
    async updateType(typeId, createTypeDto) {
        const typeExists = await this.typeRepository.findById(typeId);
        if (!typeExists) {
            throw new common_1.HttpException('Type not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.typeRepository.update(typeId, createTypeDto);
        return {
            message: 'Update type success',
        };
    }
    async updateImage(typeId, imageUrl) {
        const type = await this.typeRepository.findById(typeId);
        if (!type) {
            throw new common_1.HttpException('Type not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.typeRepository.updateImage(typeId, imageUrl);
        return {
            message: 'Update image success',
        };
    }
    async createType(createTypeDto) {
        try {
            const categoryIdObject = new mongoose_1.Types.ObjectId(createTypeDto.categoryId);
            const data = { ...createTypeDto, categoryId: categoryIdObject };
            const Newtype = await this.typeRepository.create(data);
            return {
                message: 'Create type success',
            };
        }
        catch (err) {
            throw new common_1.HttpException('Create type error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.TypeService = TypeService;
exports.TypeService = TypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_repository_1.TypeRepository])
], TypeService);
//# sourceMappingURL=type.service.js.map
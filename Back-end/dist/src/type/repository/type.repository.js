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
exports.TypeRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const type_shema_1 = require("../schema/type.shema");
const mongodb_1 = require("mongodb");
let TypeRepository = class TypeRepository {
    constructor(typeModel) {
        this.typeModel = typeModel;
    }
    async getAll() {
        return await this.typeModel.find();
    }
    async getTypesByCategoryId(categoryId) {
        const categoryIdObject = new mongodb_1.ObjectId(categoryId);
        return await this.typeModel.find({ categoryId: categoryIdObject });
    }
    async findById(typeId) {
        return await this.typeModel.findById(typeId);
    }
    async delete(typeId) {
        return await this.typeModel.findByIdAndDelete(typeId);
    }
    async updateImage(typeId, imageUrl) {
        return await this.typeModel.findByIdAndUpdate(typeId, { image: imageUrl }, { new: true });
    }
    async update(typeId, createTypeDto) {
        return await this.typeModel.findByIdAndUpdate(typeId, createTypeDto, {
            new: true,
        });
    }
    async create(data) {
        return this.typeModel.create(data);
    }
};
exports.TypeRepository = TypeRepository;
exports.TypeRepository = TypeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(type_shema_1.Type.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TypeRepository);
//# sourceMappingURL=type.repository.js.map
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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_shema_1 = require("../schema/product.shema");
const mongodb_1 = require("mongodb");
let ProductRepository = class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async getAll() {
        return await this.productModel.find();
    }
    async findById(id) {
        return await this.productModel.findById(id);
    }
    async findAllAndSort(sortOrder) {
        console.log('sortOrder in repo: ' + sortOrder);
        if (sortOrder === 'asc') {
            return await this.productModel.find().sort({ salePrice: 'asc' });
        }
        return await this.productModel.find().sort({ salePrice: 'desc' });
    }
    async getProductByTypeId(typeId) {
        try {
            const typeIdObject = new mongodb_1.ObjectId(typeId);
            return await this.productModel.find({ typeId: typeIdObject });
        }
        catch (err) {
            throw new common_1.HttpException('Find product by type id error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getProductByTypeIds(typeIds) {
        return await this.productModel.find({ typeId: { $in: typeIds } });
    }
    async getProductsByCategoryId(categoryId) {
        return await this.productModel.aggregate([
            {
                $lookup: {
                    from: 'types',
                    localField: 'categoryIdString',
                    foreignField: 'categoyrId',
                    as: 'type',
                },
            },
        ]);
    }
    async updateImagesOfProduct(productId, urlFiles) {
        return await this.productModel.findOneAndUpdate({ _id: productId }, {
            images: urlFiles,
        });
    }
    async create(data) {
        const createdProduct = new this.productModel(data);
        return createdProduct.save();
    }
    async deleteById(productId) {
        return await this.productModel.findByIdAndDelete(productId);
    }
    async updateById(productId, createProductDto) {
        return await this.productModel.findByIdAndUpdate(productId, createProductDto, {
            new: true,
        });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_shema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map
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
exports.CartRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_shema_1 = require("../schema/cart.shema");
let CartRepository = class CartRepository {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async getAll() {
        return await this.cartModel.find();
    }
    async create(data) {
        return this.cartModel.create(data);
    }
    async getById(id) {
        return await this.cartModel.findById(id);
    }
    async getByProductIdAndUserId(userId, productId) {
        return this.cartModel.find({ userId: userId, productId: productId });
    }
    async getByUserId(userId) {
        return this.cartModel.aggregate([
            {
                $match: {
                    userId: userId,
                },
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product',
                },
            },
        ]);
    }
    async getCartByProductIdAndUserId(productId, userId) {
        return await this.cartModel.findOne({ productId, userId });
    }
    async deleteCartByProductIdAndUserId(productId, userId) {
        return await this.cartModel.deleteOne({ productId, userId });
    }
    async deleteCartById(cartId) {
        return await this.cartModel.findByIdAndDelete(cartId);
    }
    async updateCartQuantity(productId, userId, quantity) {
        return this.cartModel
            .findOneAndUpdate({ productId, userId }, { $inc: { quantity } }, { new: true })
            .exec();
    }
};
exports.CartRepository = CartRepository;
exports.CartRepository = CartRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_shema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartRepository);
//# sourceMappingURL=cart.repository.js.map
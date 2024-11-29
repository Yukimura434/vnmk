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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const cart_repository_1 = require("../repository/cart.repository");
const mongodb_1 = require("mongodb");
let CartService = class CartService {
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    }
    async createCart(createCartDto) {
        const userIdObject = new mongoose_1.Types.ObjectId(createCartDto.userId);
        const productIdObject = new mongoose_1.Types.ObjectId(createCartDto.productId);
        try {
            const existingCart = await this.cartRepository.getCartByProductIdAndUserId(productIdObject, userIdObject);
            if (existingCart) {
                const updatedCart = await this.cartRepository.updateCartQuantity(productIdObject, userIdObject, createCartDto.quantity);
                return {
                    message: 'Cart quantity updated successfully',
                    cart: updatedCart,
                };
            }
            else {
                const data = {
                    userId: userIdObject,
                    productId: productIdObject,
                    quantity: createCartDto.quantity,
                };
                const newCart = await this.cartRepository.create(data);
                return {
                    message: 'Create cart success',
                    cart: newCart,
                };
            }
        }
        catch (err) {
            throw new common_1.HttpException('Create cart error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getCartByUserId(userId) {
        const userIdObject = new mongoose_1.Types.ObjectId(userId);
        return this.cartRepository.getByUserId(userIdObject);
    }
    async getCartByProductIdAndUserId(productId, userId) {
        return await this.cartRepository.getCartByProductIdAndUserId(productId, userId);
    }
    async getAllCarts() {
        return this.cartRepository.getAll();
    }
    async deleteCartById(CartId) {
        const cartIdObjectId = new mongoose_1.Types.ObjectId(CartId);
        const cartExists = await this.cartRepository.getById(cartIdObjectId);
        if (!cartExists) {
            throw new common_1.HttpException('Cart not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.cartRepository.deleteCartById(cartIdObjectId);
    }
    async deleteCartByProductIdAndUserId(productId, userId) {
        const cartExists = await this.cartRepository.getCartByProductIdAndUserId(productId, userId);
        if (!cartExists) {
            throw new common_1.HttpException('Cart not found', common_1.HttpStatus.NOT_FOUND);
        }
        return await this.cartRepository.deleteCartByProductIdAndUserId(productId, userId);
    }
    async deleteCartByProductIdsAndUserId(userId, productIds) {
        const userIdObjectId = new mongodb_1.ObjectId(userId);
        const productIdsObjectId = productIds.map((productId) => new mongodb_1.ObjectId(productId));
        try {
            const deletePromises = productIdsObjectId.map(async (productId) => {
                try {
                    await this.deleteCartByProductIdAndUserId(productId, userIdObjectId);
                }
                catch (err) {
                    throw new Error(`Error deleting cart for productId ${productId}: ${err.message}`);
                }
            });
            await Promise.all(deletePromises);
            return {
                message: 'Delete carts successfully',
            };
        }
        catch (err) {
            throw new common_1.HttpException('Delete carts error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_repository_1.CartRepository])
], CartService);
//# sourceMappingURL=cart.service.js.map
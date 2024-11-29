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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_shema_1 = require("../schema/order.shema");
let OrderRepository = class OrderRepository {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async getAll() {
        return await this.orderModel.find();
    }
    async findOrderUser(userId) {
        return await this.orderModel.find({ userId });
    }
    async create(newOrder) {
        return this.orderModel.create(newOrder);
    }
    async findOrderSuccess(data) {
        console.log('data in repo:', data);
        return await this.orderModel.find({
            userId: data.userId,
            status: 'success',
            products: {
                $elemMatch: { productId: data.productId },
            },
        });
    }
    async findById(id) {
        return await this.orderModel.findById(id);
    }
    async updateShippingInfo(orderId, shippingInfo) {
        return await this.orderModel.findByIdAndUpdate(orderId, { shippingInfo }, { new: true });
    }
    async updatePaymentStatus(orderId, paymentStatus) {
        return await this.orderModel.findByIdAndUpdate(orderId, { paymentStatus }, { new: true });
    }
    async updateStatus(orderId) {
        return await this.orderModel.findByIdAndUpdate(orderId, { status: 'success' }, { new: true });
    }
    async updateShippingStatus(orderId, shippingStatus) {
        return await this.orderModel.findByIdAndUpdate(orderId, { shippingStatus }, { new: true });
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_shema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderRepository);
//# sourceMappingURL=order.repository.js.map
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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const order_repository_1 = require("../repository/order.repository");
const mongodb_1 = require("mongodb");
const cart_service_1 = require("./../../cart/service/cart.service");
const payment_service_1 = require("./../../payment/payment.service");
let OrderService = class OrderService {
    constructor(paymentService, orderRepository, cartService) {
        this.paymentService = paymentService;
        this.orderRepository = orderRepository;
        this.cartService = cartService;
    }
    async getAllOrders() {
        return await this.orderRepository.getAll();
    }
    async getOrderUser(userId) {
        const userIdObjectId = new mongodb_1.ObjectId(userId);
        const orderUser = await this.orderRepository.findOrderUser(userIdObjectId);
        return orderUser;
    }
    async createOrder(createOrderDto) {
        let totalAmount = 0;
        let productIds = [];
        createOrderDto.products.forEach((product) => {
            totalAmount += product.quantity * product.price;
            productIds.push(product.productId);
        });
        const userIdObject = new mongoose_1.Types.ObjectId(createOrderDto.userId);
        const newOrder = { ...createOrderDto, userId: userIdObject, totalAmount };
        try {
            if (createOrderDto.isInCart) {
                await this.cartService.deleteCartByProductIdsAndUserId(createOrderDto.userId, productIds);
            }
            const orderExist = await this.orderRepository.create(newOrder);
            return {
                mesage: 'create order successfully',
                orderExist,
            };
        }
        catch (err) {
            throw new common_1.HttpException('Create order error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getOrderById(orderId) {
        return this.orderRepository.findById(orderId);
    }
    async getUrlPaymentOrder(orderId) {
        try {
            const orderExist = await this.orderRepository.findById(orderId);
            if (!orderExist) {
                throw new Error('Order not found');
            }
            const paymentInf = await this.paymentService.createZaloPayment(orderExist.totalAmount, orderId);
            if (paymentInf) {
                return { success: true, paymentInf };
            }
            else {
                throw new Error('Failed to create payment URL');
            }
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async updateShippingInfo(orderId, data) {
        const orderExist = await this.orderRepository.findById(orderId);
        if (!orderExist) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await this.orderRepository.updateShippingInfo(orderId, data.shippingInfo);
        }
        catch (error) {
            console.log(error);
        }
        return {
            mesage: 'update Shipping information successfully',
        };
    }
    async updatePaymentStatus(orderId, paymentMethod) {
        if (paymentMethod === 'payment') {
            const paymentUrl = await this.getUrlPaymentOrder(orderId);
            return {
                message: paymentUrl.success,
                paymentUrl,
            };
        }
        const orderExist = await this.orderRepository.findById(orderId);
        if (!orderExist) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        const paymentStatus = 'Success';
        await this.orderRepository.updatePaymentStatus(orderId, paymentStatus);
        return {
            mesage: 'Update status success',
        };
    }
    async updateStatus(orderId) {
        const orderExist = await this.orderRepository.findById(orderId);
        if (!orderExist) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await this.orderRepository.updateStatus(orderId);
            return {
                mesage: 'Update status success',
            };
        }
        catch (err) {
            throw new common_1.HttpException('Update status error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateShippingStatus(orderId, shippingStatus) {
        const orderExist = await this.orderRepository.findById(orderId);
        if (!orderExist) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await this.orderRepository.updateShippingStatus(orderId, shippingStatus);
            if (shippingStatus == 'đã giao hàng') {
                await this.updateStatus(orderId);
            }
            return {
                mesage: 'Update shipping status success',
            };
        }
        catch (err) {
            throw new common_1.HttpException('Update shipping status error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async hasUserBoughtProduct(userId, productId) {
        const data = { userId, productId, status: 'success' };
        const orderExist = await this.orderRepository.findOrderSuccess(data);
        return orderExist;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => payment_service_1.PaymentService))),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        order_repository_1.OrderRepository,
        cart_service_1.CartService])
], OrderService);
//# sourceMappingURL=order.service.js.map
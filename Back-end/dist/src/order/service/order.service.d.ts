import { Types } from 'mongoose';
import { OrderRepository } from '../repository/order.repository';
import { ObjectId } from 'mongodb';
import { CreateOrderDto } from '../dto/CreateOrder.dto';
import { CartService } from './../../cart/service/cart.service';
import { PaymentService } from './../../payment/payment.service';
export declare class OrderService {
    private readonly paymentService;
    private orderRepository;
    private cartService;
    constructor(paymentService: PaymentService, orderRepository: OrderRepository, cartService: CartService);
    getAllOrders(): Promise<(import("mongoose").Document<unknown, {}, import("../schema/order.shema").Order> & import("../schema/order.shema").Order & {
        _id: Types.ObjectId;
    })[]>;
    getOrderUser(userId: any): Promise<(import("mongoose").Document<unknown, {}, import("../schema/order.shema").Order> & import("../schema/order.shema").Order & {
        _id: Types.ObjectId;
    })[]>;
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        mesage: string;
        orderExist: import("mongoose").Document<unknown, {}, import("../schema/order.shema").Order> & import("../schema/order.shema").Order & {
            _id: Types.ObjectId;
        };
    }>;
    getOrderById(orderId: string): Promise<import("mongoose").Document<unknown, {}, import("../schema/order.shema").Order> & import("../schema/order.shema").Order & {
        _id: Types.ObjectId;
    }>;
    getUrlPaymentOrder(orderId: string): Promise<{
        success: boolean;
        paymentInf: any;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        paymentInf?: undefined;
    }>;
    updateShippingInfo(orderId: string, data: any): Promise<{
        mesage: string;
    }>;
    updatePaymentStatus(orderId: string, paymentMethod: string): Promise<{
        message: boolean;
        paymentUrl: {
            success: boolean;
            paymentInf: any;
            message?: undefined;
        } | {
            success: boolean;
            message: any;
            paymentInf?: undefined;
        };
        mesage?: undefined;
    } | {
        mesage: string;
        message?: undefined;
        paymentUrl?: undefined;
    }>;
    updateStatus(orderId: string): Promise<{
        mesage: string;
    }>;
    updateShippingStatus(orderId: string, shippingStatus: string): Promise<{
        mesage: string;
    }>;
    hasUserBoughtProduct(userId: ObjectId, productId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schema/order.shema").Order> & import("../schema/order.shema").Order & {
        _id: Types.ObjectId;
    })[]>;
}

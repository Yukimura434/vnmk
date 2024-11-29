import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { OrderRepository } from '../repository/order.repository';
import { ObjectId } from 'mongodb';
import { CreateOrderDto } from '../dto/CreateOrder.dto';
import { CartService } from './../../cart/service/cart.service';
import { PaymentService } from './../../payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(forwardRef(() => PaymentService))
    private readonly paymentService: PaymentService,
    private orderRepository: OrderRepository,
    private cartService: CartService,
  ) {}

  async getAllOrders() {
    return await this.orderRepository.getAll();
  }

  async getOrderUser(userId) {
    const userIdObjectId = new ObjectId(userId);
    const orderUser = await this.orderRepository.findOrderUser(userIdObjectId);
    return orderUser;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    let totalAmount = 0;
    let productIds = [];
    createOrderDto.products.forEach((product) => {
      totalAmount += product.quantity * product.price;
      productIds.push(product.productId);
    });
    const userIdObject = new Types.ObjectId(createOrderDto.userId);
    const newOrder = { ...createOrderDto, userId: userIdObject, totalAmount };
    try {
      if (createOrderDto.isInCart) {
        await this.cartService.deleteCartByProductIdsAndUserId(
          createOrderDto.userId,
          productIds,
        );
      }

      const orderExist = await this.orderRepository.create(newOrder);
      return {
        mesage: 'create order successfully',
        orderExist,
      };
    } catch (err) {
      throw new HttpException('Create order error', HttpStatus.BAD_REQUEST);
    }
  }

  async getOrderById(orderId: string) {
    return this.orderRepository.findById(orderId);
  }

  async getUrlPaymentOrder(orderId: string) {
    try {
      const orderExist = await this.orderRepository.findById(orderId);
      if (!orderExist) {
        throw new Error('Order not found');
      }

      const paymentInf = await this.paymentService.createZaloPayment(
        orderExist.totalAmount,
        orderId,
      );

      if (paymentInf) {
        return { success: true, paymentInf };
      } else {
        throw new Error('Failed to create payment URL');
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateShippingInfo(orderId: string, data: any) {
    const orderExist = await this.orderRepository.findById(orderId);
    if (!orderExist) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.orderRepository.updateShippingInfo(orderId, data.shippingInfo);
    } catch (error) {
      console.log(error);
    }
    return {
      mesage: 'update Shipping information successfully',
    };
  }

  async updatePaymentStatus(orderId: string, paymentMethod: string) {
    if (paymentMethod === 'payment') {
      const paymentUrl = await this.getUrlPaymentOrder(orderId);
      return {
        message: paymentUrl.success,
        paymentUrl,
      };
    }

    const orderExist = await this.orderRepository.findById(orderId);
    if (!orderExist) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    const paymentStatus = 'Success';
    await this.orderRepository.updatePaymentStatus(orderId, paymentStatus);
    return {
      mesage: 'Update status success',
    };
  }

  async updateStatus(orderId: string) {
    const orderExist = await this.orderRepository.findById(orderId);
    if (!orderExist) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.orderRepository.updateStatus(orderId);
      return {
        mesage: 'Update status success',
      };
    } catch (err) {
      throw new HttpException(
        'Update status error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateShippingStatus(orderId: string, shippingStatus: string) {
    const orderExist = await this.orderRepository.findById(orderId);
    if (!orderExist) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.orderRepository.updateShippingStatus(orderId, shippingStatus);
      if (shippingStatus == 'đã giao hàng') {
        await this.updateStatus(orderId);
      }
      return {
        mesage: 'Update shipping status success',
      };
    } catch (err) {
      throw new HttpException(
        'Update shipping status error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async hasUserBoughtProduct(userId: ObjectId, productId: string) {
    const data = { userId, productId, status: 'success' };
    const orderExist = await this.orderRepository.findOrderSuccess(data);
    return orderExist;
  }
}

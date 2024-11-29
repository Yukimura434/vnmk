import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './service/order.service';
import { OrderRepository } from './repository/order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema/order.shema';
import { CartService } from 'src/cart/service/cart.service';
import { CartModule } from 'src/cart/cart.module';
import { PaymentModule } from 'src/payment/payment.module';
import { VerifyTokenMiddleware } from 'src/middlewares/logging.middleware';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => PaymentModule),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    CartModule,
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, CartService],
  exports: [OrderService],
})
export class OrderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes(
        { path: 'orders/:orderId/shipping-info', method: RequestMethod.PUT },
        { path: 'orders/:orderId/shipping-status', method: RequestMethod.PUT },
        { path: 'orders/:orderId/status', method: RequestMethod.PUT },
        { path: 'orders', method: RequestMethod.POST },
      );
  }
}

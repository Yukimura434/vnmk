import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './service/cart.service';
import { CartRepository } from './repository/cart.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema/cart.shema';
import { VerifyTokenMiddleware } from 'src/middlewares/logging.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
  exports: [CartService, CartRepository],
})
export class CartModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes(
        { path: 'carts/user/:userId', method: RequestMethod.PUT },
        { path: 'carts', method: RequestMethod.POST },
      );
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './service/product.service';
import { ProductRepository } from './repository/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.shema';
import { TypeService } from 'src/type/service/type.service';
import { TypeModule } from 'src/type/type.module';
import { TypeRepository } from 'src/type/repository/type.repository';
import { Type, TypeSchema } from 'src/type/schema/type.shema';
import { CheckPermissionMiddleware } from 'src/middlewares/checkPermission.middleware';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
    UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, TypeService, TypeRepository],
  exports: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckPermissionMiddleware)
      .forRoutes(
        { path: 'products/:productId', method: RequestMethod.DELETE },
        { path: 'products/:productId', method: RequestMethod.PUT },
        { path: 'products', method: RequestMethod.POST },
      );
  }
}

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UploadController } from './upload.controller';
import { ProductModule } from 'src/product/product.module';
import { TypeModule } from 'src/type/type.module';
import { CheckPermissionMiddleware } from 'src/middlewares/checkPermission.middleware';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ProductModule, TypeModule, UserModule],
  controllers: [UploadController],
})
export class UploadModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckPermissionMiddleware)
      .forRoutes({ path: 'menus', method: RequestMethod.POST });
  }
}

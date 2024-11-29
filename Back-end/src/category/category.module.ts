import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './service/category.service';
import { CategoryRepository } from './repository/category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.shema';
import { UserModule } from 'src/user/user.module';
import { CheckPermissionMiddleware } from 'src/middlewares/checkPermission.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    UserModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckPermissionMiddleware)
      .forRoutes(
        { path: 'categories/:categoryId', method: RequestMethod.DELETE },
        { path: 'categories/:categoryId', method: RequestMethod.PUT },
        { path: 'categories', method: RequestMethod.POST },
      );
  }
}

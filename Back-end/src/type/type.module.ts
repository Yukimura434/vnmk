import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './service/type.service';
import { TypeRepository } from './repository/type.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from './schema/type.shema';
import { CheckPermissionMiddleware } from 'src/middlewares/checkPermission.middleware';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Type.name, schema: TypeSchema }]),
    UserModule,
  ],
  controllers: [TypeController],
  providers: [TypeService, TypeRepository],
  exports: [TypeService, TypeRepository],
})
export class TypeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckPermissionMiddleware)
      .forRoutes(
        { path: 'types/:typeId', method: RequestMethod.DELETE },
        { path: 'types/:typeId', method: RequestMethod.PUT },
        { path: 'types', method: RequestMethod.POST },
      );
  }
}

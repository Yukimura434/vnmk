import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuRepository } from './repository/menu.repository';
import { Menu, MenuSchema } from './schema/menu.shema';
import { MenuService } from './service/menu.service';
import { CheckPermissionMiddleware } from 'src/middlewares/checkPermission.middleware';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }]),
    UserModule,
  ],
  controllers: [MenuController],
  providers: [MenuService, MenuRepository],
})
export class MenuModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckPermissionMiddleware)
      .forRoutes(
        { path: 'menus/:menus', method: RequestMethod.DELETE },
        { path: 'menus/:menus', method: RequestMethod.PUT },
        { path: 'menus', method: RequestMethod.POST },
      );
  }
}

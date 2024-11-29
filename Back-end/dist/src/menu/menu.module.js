"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const common_1 = require("@nestjs/common");
const menu_controller_1 = require("./menu.controller");
const mongoose_1 = require("@nestjs/mongoose");
const menu_repository_1 = require("./repository/menu.repository");
const menu_shema_1 = require("./schema/menu.shema");
const menu_service_1 = require("./service/menu.service");
const checkPermission_middleware_1 = require("../middlewares/checkPermission.middleware");
const user_module_1 = require("../user/user.module");
let MenuModule = class MenuModule {
    configure(consumer) {
        consumer
            .apply(checkPermission_middleware_1.CheckPermissionMiddleware)
            .forRoutes({ path: 'menus/:menus', method: common_1.RequestMethod.DELETE }, { path: 'menus/:menus', method: common_1.RequestMethod.PUT }, { path: 'menus', method: common_1.RequestMethod.POST });
    }
};
exports.MenuModule = MenuModule;
exports.MenuModule = MenuModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: menu_shema_1.Menu.name, schema: menu_shema_1.MenuSchema }]),
            user_module_1.UserModule,
        ],
        controllers: [menu_controller_1.MenuController],
        providers: [menu_service_1.MenuService, menu_repository_1.MenuRepository],
    })
], MenuModule);
//# sourceMappingURL=menu.module.js.map
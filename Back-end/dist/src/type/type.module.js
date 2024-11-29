"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeModule = void 0;
const common_1 = require("@nestjs/common");
const type_controller_1 = require("./type.controller");
const type_service_1 = require("./service/type.service");
const type_repository_1 = require("./repository/type.repository");
const mongoose_1 = require("@nestjs/mongoose");
const type_shema_1 = require("./schema/type.shema");
const checkPermission_middleware_1 = require("../middlewares/checkPermission.middleware");
const user_module_1 = require("../user/user.module");
let TypeModule = class TypeModule {
    configure(consumer) {
        consumer
            .apply(checkPermission_middleware_1.CheckPermissionMiddleware)
            .forRoutes({ path: 'types/:typeId', method: common_1.RequestMethod.DELETE }, { path: 'types/:typeId', method: common_1.RequestMethod.PUT }, { path: 'types', method: common_1.RequestMethod.POST });
    }
};
exports.TypeModule = TypeModule;
exports.TypeModule = TypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: type_shema_1.Type.name, schema: type_shema_1.TypeSchema }]),
            user_module_1.UserModule,
        ],
        controllers: [type_controller_1.TypeController],
        providers: [type_service_1.TypeService, type_repository_1.TypeRepository],
        exports: [type_service_1.TypeService, type_repository_1.TypeRepository],
    })
], TypeModule);
//# sourceMappingURL=type.module.js.map
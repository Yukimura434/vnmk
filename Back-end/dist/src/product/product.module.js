"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./service/product.service");
const product_repository_1 = require("./repository/product.repository");
const mongoose_1 = require("@nestjs/mongoose");
const product_shema_1 = require("./schema/product.shema");
const type_service_1 = require("../type/service/type.service");
const type_repository_1 = require("../type/repository/type.repository");
const type_shema_1 = require("../type/schema/type.shema");
const checkPermission_middleware_1 = require("../middlewares/checkPermission.middleware");
const user_module_1 = require("../user/user.module");
let ProductModule = class ProductModule {
    configure(consumer) {
        consumer
            .apply(checkPermission_middleware_1.CheckPermissionMiddleware)
            .forRoutes({ path: 'products/:productId', method: common_1.RequestMethod.DELETE }, { path: 'products/:productId', method: common_1.RequestMethod.PUT }, { path: 'products', method: common_1.RequestMethod.POST });
    }
};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: product_shema_1.Product.name, schema: product_shema_1.ProductSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: type_shema_1.Type.name, schema: type_shema_1.TypeSchema }]),
            user_module_1.UserModule,
        ],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService, product_repository_1.ProductRepository, type_service_1.TypeService, type_repository_1.TypeRepository],
        exports: [product_service_1.ProductService],
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map
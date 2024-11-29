"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const category_module_1 = require("./category/category.module");
const product_module_1 = require("./product/product.module");
const type_module_1 = require("./type/type.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const upload_module_1 = require("./upload/upload.module");
const cart_module_1 = require("./cart/cart.module");
const menu_module_1 = require("./menu/menu.module");
const order_module_1 = require("./order/order.module");
const review_module_1 = require("./review/review.module");
require('dotenv').config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'uploads', 'products'),
                serveRoot: '/api/uploads/products',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'uploads', 'avatars'),
                serveRoot: '/api/uploads/avatars',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'uploads', 'types'),
                serveRoot: '/api/uploads/types',
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            type_module_1.TypeModule,
            product_module_1.ProductModule,
            upload_module_1.UploadModule,
            cart_module_1.CartModule,
            menu_module_1.MenuModule,
            order_module_1.OrderModule,
            review_module_1.ReviewModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
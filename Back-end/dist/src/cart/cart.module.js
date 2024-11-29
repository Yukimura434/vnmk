"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const cart_controller_1 = require("./cart.controller");
const cart_service_1 = require("./service/cart.service");
const cart_repository_1 = require("./repository/cart.repository");
const mongoose_1 = require("@nestjs/mongoose");
const cart_shema_1 = require("./schema/cart.shema");
const logging_middleware_1 = require("../middlewares/logging.middleware");
let CartModule = class CartModule {
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.VerifyTokenMiddleware)
            .forRoutes({ path: 'carts/user/:userId', method: common_1.RequestMethod.PUT }, { path: 'carts', method: common_1.RequestMethod.POST });
    }
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: cart_shema_1.Cart.name, schema: cart_shema_1.CartSchema }]),
        ],
        controllers: [cart_controller_1.CartController],
        providers: [cart_service_1.CartService, cart_repository_1.CartRepository],
        exports: [cart_service_1.CartService, cart_repository_1.CartRepository],
    })
], CartModule);
//# sourceMappingURL=cart.module.js.map
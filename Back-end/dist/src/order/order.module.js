"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./service/order.service");
const order_repository_1 = require("./repository/order.repository");
const mongoose_1 = require("@nestjs/mongoose");
const order_shema_1 = require("./schema/order.shema");
const cart_service_1 = require("../cart/service/cart.service");
const cart_module_1 = require("../cart/cart.module");
const payment_module_1 = require("../payment/payment.module");
const logging_middleware_1 = require("../middlewares/logging.middleware");
const user_module_1 = require("../user/user.module");
let OrderModule = class OrderModule {
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.VerifyTokenMiddleware)
            .forRoutes({ path: 'orders/:orderId/shipping-info', method: common_1.RequestMethod.PUT }, { path: 'orders/:orderId/shipping-status', method: common_1.RequestMethod.PUT }, { path: 'orders/:orderId/status', method: common_1.RequestMethod.PUT }, { path: 'orders', method: common_1.RequestMethod.POST });
    }
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => payment_module_1.PaymentModule),
            mongoose_1.MongooseModule.forFeature([{ name: order_shema_1.Order.name, schema: order_shema_1.OrderSchema }]),
            cart_module_1.CartModule,
            user_module_1.UserModule,
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, order_repository_1.OrderRepository, cart_service_1.CartService],
        exports: [order_service_1.OrderService],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map
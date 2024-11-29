"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const GoogleStrategy_1 = require("./utils/GoogleStrategy");
const FaceBookStrategy_1 = require("./utils/FaceBookStrategy");
const user_schema_1 = require("./schemas/user.schema");
const auth_service_1 = require("./services/auth.service");
const auth_repository_1 = require("./repository/auth.repository");
const logging_middleware_1 = require("../middlewares/logging.middleware");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
require('dotenv').config();
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(logging_middleware_1.VerifyTokenMiddleware)
            .forRoutes({ path: 'auth/logout', method: common_1.RequestMethod.POST });
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            GoogleStrategy_1.GoogleStrategy,
            FaceBookStrategy_1.FacebookStrategy,
            auth_repository_1.AuthRepository,
            jwt_strategy_1.JwtStrategy,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_repository_1.AuthRepository],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModule = void 0;
const common_1 = require("@nestjs/common");
const category_controller_1 = require("./category.controller");
const category_service_1 = require("./service/category.service");
const category_repository_1 = require("./repository/category.repository");
const mongoose_1 = require("@nestjs/mongoose");
const category_shema_1 = require("./schema/category.shema");
const user_module_1 = require("../user/user.module");
const checkPermission_middleware_1 = require("../middlewares/checkPermission.middleware");
let CategoryModule = class CategoryModule {
    configure(consumer) {
        consumer
            .apply(checkPermission_middleware_1.CheckPermissionMiddleware)
            .forRoutes({ path: 'categories/:categoryId', method: common_1.RequestMethod.DELETE }, { path: 'categories/:categoryId', method: common_1.RequestMethod.PUT }, { path: 'categories', method: common_1.RequestMethod.POST });
    }
};
exports.CategoryModule = CategoryModule;
exports.CategoryModule = CategoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: category_shema_1.Category.name, schema: category_shema_1.CategorySchema },
            ]),
            user_module_1.UserModule,
        ],
        controllers: [category_controller_1.CategoryController],
        providers: [category_service_1.CategoryService, category_repository_1.CategoryRepository],
    })
], CategoryModule);
//# sourceMappingURL=category.module.js.map
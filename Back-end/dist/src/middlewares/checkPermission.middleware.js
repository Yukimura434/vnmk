"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPermissionMiddleware = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const user_schema_1 = require("../auth/schemas/user.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CheckPermissionMiddleware = class CheckPermissionMiddleware {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async use(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(403).json({
                    message: 'Bạn cần phải đăng nhập để thực hiện hành động này!',
                });
            }
            const decoded = await this.jwtService.verifyAsync(token, {
                secret: process.env.ACCESS_TOKEN_SECRET,
            });
            console.log('decoded :', decoded);
            const user = await this.userModel.findById(decoded.userId);
            console.log('user :', user);
            if (!user) {
                return res.status(403).json({
                    message: 'Token lỗi',
                });
            }
            if (user.role !== 'admin') {
                return res.status(403).json({
                    message: 'Bạn không có quyền thực hiện hành động này',
                });
            }
            next();
        }
        catch (error) {
            res.status(500).json({
                name: error.name,
                message: error.message,
            });
        }
    }
};
exports.CheckPermissionMiddleware = CheckPermissionMiddleware;
exports.CheckPermissionMiddleware = CheckPermissionMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_1.Model])
], CheckPermissionMiddleware);
//# sourceMappingURL=checkPermission.middleware.js.map
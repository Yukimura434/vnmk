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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async updateUser(userId, updateUserDto) {
        const existingUser = await this.userRepository.findUserToUpdate(userId);
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            const userUpdate = await this.userRepository.saveUserByUserId(userId, updateUserDto);
            return {
                message: 'Update user successfully',
                user: userUpdate,
            };
        }
        catch (err) {
            throw new common_1.HttpException('Update error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateShippingInfo(userId, data) {
        const existingUser = await this.userRepository.findById(userId);
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        try {
            await this.userRepository.updateShippingInfo(userId, data);
            return {
                message: 'Update shipping info successfully',
            };
        }
        catch (err) {
            throw new common_1.HttpException('Update shipping info error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map
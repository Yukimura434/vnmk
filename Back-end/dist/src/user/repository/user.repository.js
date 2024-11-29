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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../auth/schemas/user.schema");
const mongodb_1 = require("mongodb");
let UserRepository = class UserRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async findById(userId) {
        return await this.UserModel.findById(userId);
    }
    async updateShippingInfo(userId, data) {
        return await this.UserModel.findByIdAndUpdate(userId, {
            contactPhone: data.contactPhone,
            address: data.address,
            addressDetail: data.addressDetail,
        }, { new: true });
    }
    async findUserToUpdate(userId) {
        const user = await this.UserModel.findById(userId)
            .select('displayName contactPhone facebookId avaUrl')
            .lean();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async saveUserByUserId(userId, updateData) {
        console.log('updateData :', updateData);
        console.log('userId :', userId);
        const userIdObject = new mongodb_1.ObjectId(userId);
        const updatedUser = await this.UserModel.findOneAndUpdate({ _id: userIdObject }, { $set: updateData }, { new: true, runValidators: true }).select('displayName contactPhone facebookId avaUrl');
        return updatedUser;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map
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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
require('dotenv').config();
let AuthRepository = class AuthRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async findById(userId) {
        return await this.UserModel.findById(userId);
    }
    async findUserAndUpdateToken(username, accessToken, refreshToken) {
        await this.UserModel.findOneAndUpdate({ username: username }, {
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
    }
    async findUserByFacebookType(username) {
        return await this.UserModel.findOne({
            type: 'FACEBOOK',
            username: username,
        }).lean();
    }
    async findUserByGoogleType(username) {
        return await this.UserModel.findOne({
            type: 'GOOGLE',
            username: username,
        }).lean();
    }
    async createUserByFacebookType(username, displayName) {
        return await this.UserModel.create({
            type: 'FACEBOOK',
            username: username,
            displayName: displayName,
            facebookId: username,
        });
    }
    async createUserByGoogleType(username, displayName, avaUrl) {
        return await this.UserModel.create({
            type: 'GOOGLE',
            username: username,
            displayName: displayName,
            avaUrl: avaUrl,
        });
    }
    async createUser(user) {
        return await this.UserModel.create(user);
    }
    async findByUserName(username) {
        return await this.UserModel.findOne({
            username: username,
        }).lean();
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map
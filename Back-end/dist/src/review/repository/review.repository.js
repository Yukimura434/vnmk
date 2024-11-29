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
exports.ReviewRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const review_shema_1 = require("../schema/review.shema");
let ReviewRepository = class ReviewRepository {
    constructor(reviewModel) {
        this.reviewModel = reviewModel;
    }
    async findById(reviewId) {
        return await this.reviewModel.findById(reviewId);
    }
    async findReviewByProductId(productId) {
        return await this.reviewModel.find({ productId });
    }
    async delete(reviewId) {
        return await this.reviewModel.findByIdAndDelete(reviewId);
    }
    async update(reviewId, createReviewDto) {
        return await this.reviewModel.findByIdAndUpdate(reviewId, createReviewDto, {
            new: true,
        });
    }
    async create(data) {
        return this.reviewModel.create(data);
    }
};
exports.ReviewRepository = ReviewRepository;
exports.ReviewRepository = ReviewRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(review_shema_1.Review.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ReviewRepository);
//# sourceMappingURL=review.repository.js.map
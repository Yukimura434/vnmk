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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const review_repository_1 = require("../repository/review.repository");
const mongodb_1 = require("mongodb");
const order_service_1 = require("../../order/service/order.service");
let ReviewService = class ReviewService {
    constructor(reviewRepository, orderService) {
        this.reviewRepository = reviewRepository;
        this.orderService = orderService;
    }
    async createReview(createReviewDto) {
        const userIdObjectId = new mongodb_1.ObjectId(createReviewDto.userId);
        const productIdObjectId = new mongodb_1.ObjectId(createReviewDto.productId);
        const orderExists = await this.orderService.hasUserBoughtProduct(userIdObjectId, createReviewDto.productId);
        console.log('orderExists :', orderExists);
        if (orderExists.length < 1) {
            throw new common_1.HttpException('You have not purchased this product before', common_1.HttpStatus.FORBIDDEN);
        }
        const data = {
            comment: createReviewDto.comment,
            rate: createReviewDto.rate,
            userId: userIdObjectId,
            productId: productIdObjectId,
        };
        const newReview = await this.reviewRepository.create(data);
        return {
            message: 'Create review success',
            review: newReview,
        };
    }
    async getReviewsByProductId(productId) {
        const productIdObjectId = new mongodb_1.ObjectId(productId);
        const reviews = await this.reviewRepository.findReviewByProductId(productIdObjectId);
        if (reviews.length === 0) {
            return { reviews, avgRate: 0 };
        }
        const totalRate = reviews.reduce((sum, review) => sum + review.rate, 0);
        const avgRate = totalRate / reviews.length;
        return { reviews, avgRate };
    }
    async deleteReview(reviewId) {
        const review = await this.reviewRepository.findById(reviewId);
        if (!review) {
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.reviewRepository.delete(reviewId);
        return {
            message: 'Delete review success',
        };
    }
    async updateReview(reviewId, createReviewDto) {
        const reviewExists = await this.reviewRepository.findById(reviewId);
        if (!reviewExists) {
            throw new common_1.HttpException('Review not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.reviewRepository.update(reviewId, createReviewDto);
        return {
            message: 'Update review success',
        };
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository,
        order_service_1.OrderService])
], ReviewService);
//# sourceMappingURL=review.service.js.map
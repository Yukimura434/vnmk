import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewRepository } from '../repository/review.repository';
import { CreateReviewDto } from '../dto/CreateReview.dto';
import { ObjectId } from 'mongodb';
import { OrderService } from 'src/order/service/order.service';
@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private orderService: OrderService,
  ) {}
  async createReview(createReviewDto: CreateReviewDto) {
    const userIdObjectId = new ObjectId(createReviewDto.userId);
    const productIdObjectId = new ObjectId(createReviewDto.productId);

    const orderExists = await this.orderService.hasUserBoughtProduct(
      userIdObjectId,
      createReviewDto.productId,
    );
    console.log('orderExists :', orderExists);

    if (orderExists.length < 1) {
      throw new HttpException(
        'You have not purchased this product before',
        HttpStatus.FORBIDDEN,
      );
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

  async getReviewsByProductId(productId: string) {
    const productIdObjectId = new ObjectId(productId);
    const reviews =
      await this.reviewRepository.findReviewByProductId(productIdObjectId);

    if (reviews.length === 0) {
      return { reviews, avgRate: 0 };
    }

    const totalRate = reviews.reduce((sum, review) => sum + review.rate, 0);
    const avgRate = totalRate / reviews.length;

    return { reviews, avgRate };
  }
  async deleteReview(reviewId: string) {
    const review = await this.reviewRepository.findById(reviewId);
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    await this.reviewRepository.delete(reviewId);
    return {
      message: 'Delete review success',
    };
  }
  async updateReview(reviewId: string, createReviewDto: CreateReviewDto) {
    const reviewExists = await this.reviewRepository.findById(reviewId);
    if (!reviewExists) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    await this.reviewRepository.update(reviewId, createReviewDto);
    return {
      message: 'Update review success',
    };
  }
}

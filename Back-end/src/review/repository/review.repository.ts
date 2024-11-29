import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from '../dto/CreateReview.dto';
import { ObjectId } from 'mongodb';
import { Review } from '../schema/review.shema';
@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<Review>,
  ) {}

  async findById(reviewId: string) {
    return await this.reviewModel.findById(reviewId);
  }

  async findReviewByProductId(productId: ObjectId) {
    return await this.reviewModel.find({ productId });
  }

  async delete(reviewId: string) {
    return await this.reviewModel.findByIdAndDelete(reviewId);
  }

  async update(reviewId: string, createReviewDto: CreateReviewDto) {
    return await this.reviewModel.findByIdAndUpdate(reviewId, createReviewDto, {
      new: true,
    });
  }

  async create(data: any) {
    return this.reviewModel.create(data);
  }
}

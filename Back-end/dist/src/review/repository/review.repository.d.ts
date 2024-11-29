import { Model } from 'mongoose';
import { CreateReviewDto } from '../dto/CreateReview.dto';
import { ObjectId } from 'mongodb';
import { Review } from '../schema/review.shema';
export declare class ReviewRepository {
    private reviewModel;
    constructor(reviewModel: Model<Review>);
    findById(reviewId: string): Promise<import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findReviewByProductId(productId: ObjectId): Promise<(import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    delete(reviewId: string): Promise<import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(reviewId: string, createReviewDto: CreateReviewDto): Promise<import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(data: any): Promise<import("mongoose").Document<unknown, {}, Review> & Review & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

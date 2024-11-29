import { ReviewService } from './service/review.service';
import { CreateReviewDto } from './dto/CreateReview.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    getReviewsByProductId(productId: any): Promise<{
        reviews: (import("mongoose").Document<unknown, {}, import("./schema/review.shema").Review> & import("./schema/review.shema").Review & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        avgRate: number;
    }>;
    createReview(createReviewDto: CreateReviewDto): Promise<{
        message: string;
        review: import("mongoose").Document<unknown, {}, import("./schema/review.shema").Review> & import("./schema/review.shema").Review & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateReview(reviewId: string, updateReviewDto: CreateReviewDto): Promise<{
        message: string;
    }>;
    deleteReview(reviewId: string): Promise<{
        message: string;
    }>;
}

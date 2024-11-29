import { ReviewRepository } from '../repository/review.repository';
import { CreateReviewDto } from '../dto/CreateReview.dto';
import { OrderService } from 'src/order/service/order.service';
export declare class ReviewService {
    private reviewRepository;
    private orderService;
    constructor(reviewRepository: ReviewRepository, orderService: OrderService);
    createReview(createReviewDto: CreateReviewDto): Promise<{
        message: string;
        review: import("mongoose").Document<unknown, {}, import("../schema/review.shema").Review> & import("../schema/review.shema").Review & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getReviewsByProductId(productId: string): Promise<{
        reviews: (import("mongoose").Document<unknown, {}, import("../schema/review.shema").Review> & import("../schema/review.shema").Review & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        avgRate: number;
    }>;
    deleteReview(reviewId: string): Promise<{
        message: string;
    }>;
    updateReview(reviewId: string, createReviewDto: CreateReviewDto): Promise<{
        message: string;
    }>;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './service/review.service';
import { CreateReviewDto } from './dto/CreateReview.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/product/:productId')
  getReviewsByProductId(@Param('productId') productId) {
    return this.reviewService.getReviewsByProductId(productId);
  }

  @Post('')
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.createReview(createReviewDto);
  }

  @Put(':reviewId')
  updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, updateReviewDto);
  }

  @Delete(':reviewId')
  deleteReview(@Param('reviewId') reviewId: string) {
    return this.reviewService.deleteReview(reviewId);
  }
}

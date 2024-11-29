import {
  IsNotEmpty,
  IsNumber,
  IsString,
  isString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  comment: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rate: number;

  @IsString()
  userId: string;

  @IsString()
  productId: string;
}

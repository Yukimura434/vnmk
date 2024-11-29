import { Optional } from '@nestjs/common';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductOrder } from 'src/interface/product-order.interface';
import { ShippingInfo } from 'src/interface/shipping-infor.interface';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  products: ProductOrder[];

  @Optional()
  @IsNotEmpty()
  shippingInfo: ShippingInfo;

  @IsOptional()
  @IsBoolean()
  isInCart?: Boolean;
}

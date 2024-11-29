import { ProductOrder } from 'src/interface/product-order.interface';
import { ShippingInfo } from 'src/interface/shipping-infor.interface';
export declare class CreateOrderDto {
    userId: string;
    products: ProductOrder[];
    shippingInfo: ShippingInfo;
    isInCart?: Boolean;
}

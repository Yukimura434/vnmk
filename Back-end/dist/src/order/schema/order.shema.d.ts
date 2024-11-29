import { Document, Types } from 'mongoose';
import { ProductOrder } from 'src/interface/product-order.interface';
export declare class ShippingInfo {
    receiver: string;
    phone: string;
    address: string;
    addressDetail: string;
}
export declare class Order {
    userId: Types.ObjectId;
    products: ProductOrder[];
    totalAmount: number;
    orderDate: Date;
    shippingInfo: ShippingInfo;
    status: string;
    paymentStatus: string;
    shippingStatus: string;
    paymentMethod: string;
    isInCart: boolean;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order> & Order & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & {
    _id: Types.ObjectId;
}>;

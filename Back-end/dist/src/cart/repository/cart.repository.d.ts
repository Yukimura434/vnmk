import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Cart } from '../schema/cart.shema';
export declare class CartRepository {
    private cartModel;
    constructor(cartModel: Model<Cart>);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(data: any): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getById(id: ObjectId): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getByProductIdAndUserId(userId: ObjectId, productId: ObjectId): Promise<(import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getByUserId(userId: ObjectId): Promise<any[]>;
    getCartByProductIdAndUserId(productId: ObjectId, userId: ObjectId): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteCartByProductIdAndUserId(productId: ObjectId, userId: ObjectId): Promise<import("mongodb").DeleteResult>;
    deleteCartById(cartId: ObjectId): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateCartQuantity(productId: ObjectId, userId: ObjectId, quantity: number): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

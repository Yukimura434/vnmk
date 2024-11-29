import { Types } from 'mongoose';
import { CartRepository } from '../repository/cart.repository';
import { CreateCartDto } from '../dto/CreateCart.dto';
import { ObjectId } from 'mongodb';
import { Cart } from './../schema/cart.shema';
export declare class CartService {
    private cartRepository;
    constructor(cartRepository: CartRepository);
    createCart(createCartDto: CreateCartDto): Promise<{
        message: string;
        cart: import("mongoose").Document<unknown, {}, Cart> & Cart & {
            _id: Types.ObjectId;
        };
    }>;
    getCartByUserId(userId: string): Promise<any[]>;
    getCartByProductIdAndUserId(productId: ObjectId, userId: ObjectId): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: Types.ObjectId;
    }>;
    getAllCarts(): Promise<(import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: Types.ObjectId;
    })[]>;
    deleteCartById(CartId: string): Promise<import("mongoose").Document<unknown, {}, Cart> & Cart & {
        _id: Types.ObjectId;
    }>;
    deleteCartByProductIdAndUserId(productId: ObjectId, userId: ObjectId): Promise<import("mongodb").DeleteResult>;
    deleteCartByProductIdsAndUserId(userId: string, productIds: string[]): Promise<{
        message: string;
    }>;
}

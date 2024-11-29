import { CartService } from './service/cart.service';
import { CreateCartDto } from './dto/CreateCart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    createCart(createCartDto: CreateCartDto): Promise<{
        message: string;
        cart: import("mongoose").Document<unknown, {}, import("./schema/cart.shema").Cart> & import("./schema/cart.shema").Cart & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllCart(userId: string): Promise<any[]>;
    deleteProductsInCart(userId: string, productIds: string[]): Promise<{
        message: string;
    }>;
}

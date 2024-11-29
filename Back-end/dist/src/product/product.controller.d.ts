import { CreateProductDto } from 'src/product/dto/CreateProduct.dto';
import { ProductService } from 'src/product/service/product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getRecommendedProducts(productId: string): Promise<import("./schema/product.shema").Product[]>;
    createProduct(createProductDto: CreateProductDto): Promise<{
        message: string;
    }>;
    getAllProduct(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/product.shema").Product> & import("./schema/product.shema").Product & Required<{
        _id: unknown;
    }>)[]>;
    getProductByTypeId(typeId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/product.shema").Product> & import("./schema/product.shema").Product & Required<{
        _id: unknown;
    }>)[]>;
    getProductById(productId: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/product.shema").Product> & import("./schema/product.shema").Product & Required<{
        _id: unknown;
    }>>;
    getProductsByFilter(filter: any): Promise<{
        rows: import("./schema/product.shema").Product[];
        totalProducts: any;
        page: any;
    }>;
    deleteProductById(productId: string): Promise<{
        message: string;
    }>;
    updateProductById(productId: string, updateProductDto: CreateProductDto): Promise<{
        message: string;
    }>;
}

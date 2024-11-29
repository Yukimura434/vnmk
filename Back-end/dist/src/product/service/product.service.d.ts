import { ProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../dto/createProduct.dto';
import { TypeService } from 'src/type/service/type.service';
import { Product } from '../schema/product.shema';
export declare class ProductService {
    private productRepository;
    private typeService;
    private tokenizer;
    private tfidf;
    private readonly _limit;
    constructor(productRepository: ProductRepository, typeService: TypeService);
    getRecommendedProducts(productId: string): Promise<Product[]>;
    private combineProductAttributes;
    private calculateSimilarity;
    getAllProducts(): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>)[]>;
    getProductById(productId: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>>;
    getProductByTypeId(typeId: string): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>)[]>;
    getProductsByAvailabilityStatus(categoryId: string): Promise<any[]>;
    updateImagesOfProduct(productId: string, urlFiles: string[]): Promise<{
        message: string;
    }>;
    getProductsByFilter(filter: any): Promise<{
        rows: Product[];
        totalProducts: any;
        page: any;
    }>;
    getProductsByPageNumber(products: Product[], _page: number): Product[];
    createProduct(createProductDto: CreateProductDto): Promise<{
        message: string;
    }>;
    deleteProductById(productId: string): Promise<{
        message: string;
    }>;
    updateProductById(productId: string, updateProductDto: CreateProductDto): Promise<{
        message: string;
    }>;
}

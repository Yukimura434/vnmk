import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Product } from '../schema/product.shema';
import { ObjectId } from 'mongodb';
export declare class ProductRepository {
    private productModel;
    constructor(productModel: Model<Product>);
    getAll(): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>)[]>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>>;
    findAllAndSort(sortOrder: string): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>)[]>;
    getProductByTypeId(typeId: string): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>)[]>;
    getProductByTypeIds(typeIds: ObjectId[]): Promise<(import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>)[]>;
    getProductsByCategoryId(categoryId: string): Promise<any[]>;
    updateImagesOfProduct(productId: string, urlFiles: string[]): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>>;
    create(data: any): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>>;
    deleteById(productId: string): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>>;
    updateById(productId: string, createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, Product> & Product & Required<{
        _id: unknown;
    }>>;
}

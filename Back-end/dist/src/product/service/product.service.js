"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("../repository/product.repository");
const mongoose_1 = require("mongoose");
const type_service_1 = require("../../type/service/type.service");
const natural = require("natural");
let ProductService = class ProductService {
    constructor(productRepository, typeService) {
        this.productRepository = productRepository;
        this.typeService = typeService;
        this.tokenizer = new natural.WordTokenizer();
        this.tfidf = new natural.TfIdf();
        this._limit = 16;
    }
    async getRecommendedProducts(productId) {
        const currentProduct = await this.productRepository.findById(productId);
        if (!currentProduct) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        const allProducts = await this.productRepository.getAll();
        const documents = allProducts.map(product => this.combineProductAttributes(product));
        this.tfidf.addDocument(this.combineProductAttributes(currentProduct));
        documents.forEach(doc => this.tfidf.addDocument(doc));
        const recommendedProducts = allProducts
            .filter(product => product._id.toString() !== productId)
            .map(product => ({
            product,
            similarity: this.calculateSimilarity(currentProduct, product),
        }))
            .sort((a, b) => b.similarity - a.similarity)
            .map(item => item.product);
        return recommendedProducts.slice(0, 10);
    }
    combineProductAttributes(product) {
        return `${product.description} ${product.keyCount} ${product.color} ${product.movementType} ${product.multiLayout} ${product.caseMatetial}`;
    }
    calculateSimilarity(product1, product2) {
        const tfidf1 = new natural.TfIdf();
        const tfidf2 = new natural.TfIdf();
        const doc1 = this.combineProductAttributes(product1);
        const doc2 = this.combineProductAttributes(product2);
        tfidf1.addDocument(doc1);
        tfidf2.addDocument(doc2);
        const terms1 = tfidf1.listTerms(0);
        const terms2 = tfidf2.listTerms(0);
        let dotProduct = 0;
        terms1.forEach(term1 => {
            const term1TFIDF = term1.tfidf;
            const term2 = terms2.find(t => t.term === term1.term);
            if (term2) {
                dotProduct += term1TFIDF * term2.tfidf;
            }
        });
        const norm1 = Math.sqrt(terms1.reduce((sum, term) => sum + Math.pow(term.tfidf, 2), 0));
        const norm2 = Math.sqrt(terms2.reduce((sum, term) => sum + Math.pow(term.tfidf, 2), 0));
        return dotProduct / (norm1 * norm2);
    }
    async getAllProducts() {
        return await this.productRepository.getAll();
    }
    async getProductById(productId) {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        return product;
    }
    async getProductByTypeId(typeId) {
        console.log('typeId :', typeId);
        return await this.productRepository.getProductByTypeId(typeId);
    }
    async getProductsByAvailabilityStatus(categoryId) {
        return await this.productRepository.getProductsByCategoryId(categoryId);
    }
    async updateImagesOfProduct(productId, urlFiles) {
        try {
            const product = await this.productRepository.findById(productId);
            console.log(product);
            if (!product) {
                throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
            }
            await this.productRepository.updateImagesOfProduct(productId, urlFiles);
            return {
                message: 'Update images success',
            };
        }
        catch (err) {
            throw new common_1.HttpException('Update images error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getProductsByFilter(filter) {
        let products;
        if (!filter.categoryId) {
            products = await this.productRepository.getAll();
        }
        else {
            const types = await this.typeService.getTypesByCategoryId(filter.categoryId);
            const typeIds = types.map((type) => type._id);
            products = await this.productRepository.getProductByTypeIds(typeIds);
        }
        const totalProducts = products.length;
        const filteredProducts = products.filter((product) => {
            return ((filter.typeId == null || product.typeId.toString() == filter.typeId) &&
                (filter.color == null || product.color == filter.color) &&
                (filter.keyCount == null || product.keyCount == filter.keyCount) &&
                (filter.multiLayout == null ||
                    product.multiLayout == filter.multiLayout));
        });
        if (filter._sort) {
            const sortOrder = filter._sort === 'asc' ? 1 : -1;
            filteredProducts.sort((a, b) => sortOrder * (a.salePrice - b.salePrice));
        }
        const result = this.getProductsByPageNumber(filteredProducts, filter._page);
        return {
            rows: result,
            totalProducts,
            page: filter._page,
        };
    }
    getProductsByPageNumber(products, _page) {
        let skip = (_page - 1) * this._limit;
        const result = products.slice(skip, skip + this._limit);
        return result;
    }
    async createProduct(createProductDto) {
        const typeIdObject = new mongoose_1.Types.ObjectId(createProductDto.typeId);
        const data = { ...createProductDto, typeId: typeIdObject };
        try {
            const Newproduct = await this.productRepository.create(data);
            return {
                message: 'Create product success',
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException('Create product error', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteProductById(productId) {
        const productExist = await this.productRepository.findById(productId);
        if (!productExist) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await this.productRepository.deleteById(productId);
            return {
                message: 'Delete product success',
            };
        }
        catch (err) {
            throw new common_1.HttpException('Delete product error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateProductById(productId, updateProductDto) {
        const productExist = await this.productRepository.findById(productId);
        if (!productExist) {
            throw new common_1.HttpException('Product not found', common_1.HttpStatus.NOT_FOUND);
        }
        try {
            await this.productRepository.updateById(productId, updateProductDto);
            return {
                message: 'update product success',
            };
        }
        catch (err) {
            throw new common_1.HttpException('update product error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        type_service_1.TypeService])
], ProductService);
//# sourceMappingURL=product.service.js.map
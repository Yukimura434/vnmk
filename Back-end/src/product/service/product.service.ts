import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Types } from 'mongoose';
import { TypeService } from 'src/type/service/type.service';
import { Product } from '../schema/product.shema';
import * as natural from 'natural';
@Injectable()
export class ProductService {
  private tokenizer = new natural.WordTokenizer();
  private tfidf = new natural.TfIdf();
  private readonly _limit = 16;
  constructor(
    private productRepository: ProductRepository,
    private typeService: TypeService,
  ) {}

  async getRecommendedProducts(productId: string): Promise<Product[]> {
    // Lấy sản phẩm hiện tại
    const currentProduct = await this.productRepository.findById(productId);
    if (!currentProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  
    // Lấy tất cả sản phẩm
    const allProducts = await this.productRepository.getAll();
  
    // Tạo danh sách văn bản từ các thuộc tính sản phẩm
    const documents = allProducts.map(product =>
      this.combineProductAttributes(product)
    );
  
    // Thêm mô tả của sản phẩm hiện tại vào danh sách tài liệu
    this.tfidf.addDocument(this.combineProductAttributes(currentProduct));
    documents.forEach(doc => this.tfidf.addDocument(doc));
  
    // Tính toán độ tương tự cho tất cả các sản phẩm
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
  
  private combineProductAttributes(product: Product): string {
    // Kết hợp các thuộc tính của sản phẩm thành một chuỗi văn bản
    return `${product.description} ${product.keyCount} ${product.color} ${product.movementType} ${product.multiLayout} ${product.caseMatetial}`;
  }
  
  private calculateSimilarity(product1: Product, product2: Product): number {
    const tfidf1 = new natural.TfIdf();
    const tfidf2 = new natural.TfIdf();
  
    const doc1 = this.combineProductAttributes(product1);
    const doc2 = this.combineProductAttributes(product2);
  
    tfidf1.addDocument(doc1);
    tfidf2.addDocument(doc2);
  
    const terms1 = tfidf1.listTerms(0);
    const terms2 = tfidf2.listTerms(0);
  
    // Tính tích vô hướng
    let dotProduct = 0;
    terms1.forEach(term1 => {
      const term1TFIDF = term1.tfidf;
      const term2 = terms2.find(t => t.term === term1.term);
      if (term2) {
        dotProduct += term1TFIDF * term2.tfidf;
      }
    });
  
    // Tính độ dài (norm) của vector
    const norm1 = Math.sqrt(terms1.reduce((sum, term) => sum + Math.pow(term.tfidf, 2), 0));
    const norm2 = Math.sqrt(terms2.reduce((sum, term) => sum + Math.pow(term.tfidf, 2), 0));
  
    // Tính cosine similarity
    return dotProduct / (norm1 * norm2);
  }
  
  async getAllProducts() {
    return await this.productRepository.getAll();
  }
  async getProductById(productId: string) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async getProductByTypeId(typeId: string) {
    console.log('typeId :', typeId);
    return await this.productRepository.getProductByTypeId(typeId);
  }

  async getProductsByAvailabilityStatus(categoryId: string) {
    return await this.productRepository.getProductsByCategoryId(categoryId);
  }

  async updateImagesOfProduct(productId: string, urlFiles: string[]) {
    try {
      const product = await this.productRepository.findById(productId);
      console.log(product);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      await this.productRepository.updateImagesOfProduct(productId, urlFiles);
      return {
        message: 'Update images success',
      };
    } catch (err) {
      throw new HttpException(
        'Update images error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsByFilter(filter: any) {
    let products;
    if (!filter.categoryId) {
      products = await this.productRepository.getAll();
    } else {
      const types = await this.typeService.getTypesByCategoryId(
        filter.categoryId,
      );

      const typeIds = types.map((type) => type._id);

      products = await this.productRepository.getProductByTypeIds(typeIds);
    }

    const totalProducts = products.length;

    const filteredProducts = products.filter((product) => {
      return (
        (filter.typeId == null || product.typeId.toString() == filter.typeId) &&
        (filter.color == null || product.color == filter.color) &&
        (filter.keyCount == null || product.keyCount == filter.keyCount) &&
        (filter.multiLayout == null ||
          product.multiLayout == filter.multiLayout)
      );
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

  getProductsByPageNumber(products: Product[], _page: number) {
    let skip = (_page - 1) * this._limit;
    const result = products.slice(skip, skip + this._limit);
    return result;
  }

  async createProduct(createProductDto: CreateProductDto) {
    const typeIdObject = new Types.ObjectId(createProductDto.typeId);
    const data = { ...createProductDto, typeId: typeIdObject };
    try {
      const Newproduct = await this.productRepository.create(data);
      return {
        message: 'Create product success',
      };
    } catch (err) {
      console.log(err);
      throw new HttpException('Create product error', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteProductById(productId: string) {
    const productExist = await this.productRepository.findById(productId);
    if (!productExist) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.productRepository.deleteById(productId);
      return {
        message: 'Delete product success',
      };
    } catch (err) {
      throw new HttpException(
        'Delete product error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProductById(
    productId: string,
    updateProductDto: CreateProductDto,
  ) {
    const productExist = await this.productRepository.findById(productId);
    if (!productExist) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.productRepository.updateById(productId, updateProductDto);
      return {
        message: 'update product success',
      };
    } catch (err) {
      throw new HttpException(
        'update product error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

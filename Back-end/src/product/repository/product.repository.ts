import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from '../dto/createProduct.dto';
import { Product } from '../schema/product.shema';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async getAll() {
    return await this.productModel.find();
  }
  async findById(id: string) {
    return await this.productModel.findById(id);
  }

  async findAllAndSort(sortOrder: string) {
    console.log('sortOrder in repo: ' + sortOrder);
    if (sortOrder === 'asc') {
      return await this.productModel.find().sort({ salePrice: 'asc' });
    }
    return await this.productModel.find().sort({ salePrice: 'desc' });
  }

  async getProductByTypeId(typeId: string) {
    try {
      const typeIdObject = new ObjectId(typeId);
      return await this.productModel.find({ typeId: typeIdObject });
    } catch (err) {
      throw new HttpException(
        'Find product by type id error',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProductByTypeIds(typeIds: ObjectId[]) {
    return await this.productModel.find({ typeId: { $in: typeIds } });
  }

  async getProductsByCategoryId(categoryId: string) {
    return await this.productModel.aggregate([
      {
        $lookup: {
          from: 'types',
          localField: 'categoryIdString',
          foreignField: 'categoyrId',
          as: 'type',
        },
      },
    ]);
  }

  async updateImagesOfProduct(productId: string, urlFiles: string[]) {
    return await this.productModel.findOneAndUpdate(
      { _id: productId },
      {
        images: urlFiles,
      },
    );
  }

  async create(data: any) {
    const createdProduct = new this.productModel(data);
    return createdProduct.save();
  }

  async deleteById(productId: string) {
    return await this.productModel.findByIdAndDelete(productId);
  }

  async updateById(productId: string, createProductDto: CreateProductDto) {
    return await this.productModel.findByIdAndUpdate(
      productId,
      createProductDto,
      {
        new: true,
      },
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../schema/category.shema';
import { CreateCategoryDto } from '../dto/CreateCategory.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  async findByAvailabilityStatus(availabilityStatus: string) {
    return await this.categoryModel.aggregate([
      {
        $match: { availabilityStatus: availabilityStatus },
      },
      {
        $lookup: {
          from: 'types',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'type',
        },
      },
    ]);
  }

  async findById(categoryId: string) {
    return await this.categoryModel.findById(categoryId);
  }
  async getAll() {
    return await this.categoryModel.find();
  }

  async create(data: any) {
    return this.categoryModel.create(data);
  }

  async delete(categoryId: string) {
    return await this.categoryModel.findByIdAndDelete(categoryId);
  }

  async update(categoryId: string, createCategoryDto: CreateCategoryDto) {
    return await this.categoryModel.findByIdAndUpdate(
      categoryId,
      createCategoryDto,
      { new: true },
    );
  }
}

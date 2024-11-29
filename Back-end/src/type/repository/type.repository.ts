import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Type } from '../schema/type.shema';
import { CreateTypeDto } from '../dto/CreateType.dto';
import { ObjectId } from 'mongodb';
@Injectable()
export class TypeRepository {
  constructor(
    @InjectModel(Type.name)
    private typeModel: Model<Type>,
  ) {}

  async getAll() {
    return await this.typeModel.find();
  }

  async getTypesByCategoryId(categoryId: string) {
    const categoryIdObject = new ObjectId(categoryId);
    return await this.typeModel.find({ categoryId: categoryIdObject });
  }

  async findById(typeId: string) {
    return await this.typeModel.findById(typeId);
  }

  async delete(typeId: string) {
    return await this.typeModel.findByIdAndDelete(typeId);
  }
  async updateImage(typeId: string, imageUrl: string) {
    return await this.typeModel.findByIdAndUpdate(
      typeId,
      { image: imageUrl },
      { new: true },
    );
  }
  async update(typeId: string, createTypeDto: CreateTypeDto) {
    return await this.typeModel.findByIdAndUpdate(typeId, createTypeDto, {
      new: true,
    });
  }

  async create(data: any) {
    return this.typeModel.create(data);
  }
}

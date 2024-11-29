import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TypeRepository } from '../repository/type.repository';
import { CreateTypeDto } from '../dto/CreateType.dto';
import { Types } from 'mongoose';
@Injectable()
export class TypeService {
  constructor(private typeRepository: TypeRepository) {}

  async getAllType() {
    return await this.typeRepository.getAll();
  }

  async getTypesByCategoryId(categoryId: string) {
    return await this.typeRepository.getTypesByCategoryId(categoryId);
  }

  async deleteType(typeId: string) {
    const type = await this.typeRepository.findById(typeId);
    if (!type) {
      throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
    await this.typeRepository.delete(typeId);
    return {
      message: 'Delete type success',
    };
  }
  async updateType(typeId: string, createTypeDto: CreateTypeDto) {
    const typeExists = await this.typeRepository.findById(typeId);
    if (!typeExists) {
      throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
    await this.typeRepository.update(typeId, createTypeDto);
    return {
      message: 'Update type success',
    };
  }

  async updateImage(typeId: string, imageUrl: string) {
    const type = await this.typeRepository.findById(typeId);
    if (!type) {
      throw new HttpException('Type not found', HttpStatus.NOT_FOUND);
    }
    await this.typeRepository.updateImage(typeId, imageUrl);
    return {
      message: 'Update image success',
    };
  }
  async createType(createTypeDto: CreateTypeDto) {
    try {
      const categoryIdObject = new Types.ObjectId(createTypeDto.categoryId);
      const data = { ...createTypeDto, categoryId: categoryIdObject };
      const Newtype = await this.typeRepository.create(data);
      return {
        message: 'Create type success',
      };
    } catch (err) {
      throw new HttpException('Create type error', HttpStatus.BAD_REQUEST);
    }
  }
}

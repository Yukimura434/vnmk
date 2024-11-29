import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Menu } from '../schema/menu.shema';
import { CreateMenuDto } from '../dto/CreateMenu.dto';
import { MenuController } from './../menu.controller';

interface MENU {
  _id: number;
  name: string;
  order: number;
  categories: any;
}
@Injectable()
export class MenuRepository {
  constructor(
    @InjectModel(Menu.name)
    private menuModel: Model<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    return await this.menuModel.create(createMenuDto);
  }

  async deleteMenuById(menuId: string) {
    return await this.menuModel.findByIdAndDelete(menuId);
  }

  async findAll() {
    return this.menuModel
      .aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: '_id',
            foreignField: 'menuId',
            as: 'categories',
          },
        },
        {
          $unwind: {
            path: '$categories',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'types',
            localField: 'categories._id',
            foreignField: 'categoryId',
            as: 'categories.types',
          },
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            order: { $first: '$order' },
            categories: { $push: '$categories' },
          },
        },
        {
          $sort: { order: 1 },
        },
      ])
      .exec();
  }

  async findById(menuId: string) {
    return await this.menuModel.findById(menuId);
  }

  async updateMenu(menuId: string, updateMenuDto: CreateMenuDto) {
    return await this.menuModel.findByIdAndUpdate(menuId, updateMenuDto, {
      new: true,
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) {}

  async findById(userId: string) {
    return await this.UserModel.findById(userId);
  }

  async updateShippingInfo(userId: string, data: any) {
    return await this.UserModel.findByIdAndUpdate(
      userId,
      {
        contactPhone: data.contactPhone,
        address: data.address,
        addressDetail: data.addressDetail,
      },
      { new: true },
    );
  }

  async findUserToUpdate(userId: string): Promise<User> {
    const user = await this.UserModel.findById(userId)
      .select('displayName contactPhone facebookId avaUrl')
      .lean();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async saveUserByUserId(userId: string, updateData: any): Promise<User> {
    console.log('updateData :', updateData);
    console.log('userId :', userId);

    const userIdObject = new ObjectId(userId);
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { _id: userIdObject },
      { $set: updateData },
      { new: true, runValidators: true },
    ).select('displayName contactPhone facebookId avaUrl');
    return updatedUser;
  }
}

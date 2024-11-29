import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
export declare class UserRepository {
    private UserModel;
    constructor(UserModel: Model<User>);
    findById(userId: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateShippingInfo(userId: string, data: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findUserToUpdate(userId: string): Promise<User>;
    saveUserByUserId(userId: string, updateData: any): Promise<User>;
}

import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
export declare class AuthRepository {
    private UserModel;
    constructor(UserModel: Model<User>);
    findById(userId: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findUserAndUpdateToken(username: string, accessToken: string, refreshToken: string): Promise<void>;
    findUserByFacebookType(username: string): Promise<import("mongoose").FlattenMaps<User> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findUserByGoogleType(username: string): Promise<import("mongoose").FlattenMaps<User> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createUserByFacebookType(username: string, displayName: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createUserByGoogleType(username: string, displayName: string, avaUrl: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createUser(user: any): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByUserName(username: string): Promise<import("mongoose").FlattenMaps<User> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}

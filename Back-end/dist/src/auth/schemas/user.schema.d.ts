export declare class User {
    type: string;
    displayName: string;
    username: string;
    password: string;
    avaUrl: string;
    contactPhone: string;
    address: string;
    addressDetail: string;
    facebookId: string;
    refreshToken: string;
    accessToken: string;
    role: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
}>;

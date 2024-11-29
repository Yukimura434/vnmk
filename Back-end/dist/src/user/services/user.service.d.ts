import { UpdateUserDto } from '../dto/update-user.Dto';
import { UserRepository } from '../repository/user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        user: import("../../auth/schemas/user.schema").User;
    }>;
    updateShippingInfo(userId: string, data: any): Promise<{
        message: string;
    }>;
}

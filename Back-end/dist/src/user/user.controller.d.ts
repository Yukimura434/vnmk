import { UserService } from './services/user.service';
import { UpdateUserDto } from './dto/update-user.Dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        user: import("../auth/schemas/user.schema").User;
    }>;
    updateShippingInfo(userId: string, data: any): Promise<{
        message: string;
    }>;
}

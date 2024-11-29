import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login.dto';
import { AuthRepository } from '../repository/auth.repository';
import { Response } from 'express';
import { User } from '../schemas/user.schema';
export declare class AuthService {
    private readonly authRepository;
    private jwtService;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    loginWithGoogle(profile_google: any): Promise<{
        access_token: string;
        refresh_token: string;
        userId: string;
        role: string;
    }>;
    loginWithFacebook(profile_facebook: any): Promise<{
        access_token: string;
        refresh_token: string;
        userId: string;
        role: string;
    }>;
    register(registerUserDto: RegisterUserDto): Promise<{
        message: string;
    }>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private genarateToken;
    getUserById(userId: string): Promise<{
        userId: string;
        type: string;
        userName: string;
        displayName: string;
        avaUrl: string;
        facebookId: string;
        contactPhone: string;
        address: string;
        addressDetail: string;
    }>;
    getExistingUser(user: User, userId: string): {
        userId: string;
        type: string;
        userName: string;
        displayName: string;
        avaUrl: string;
        facebookId: string;
        contactPhone: string;
        address: string;
        addressDetail: string;
    };
    private haspassword;
}

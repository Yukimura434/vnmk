import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { Request } from 'express';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
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
    register(registerUserDto: RegisterUserDto): Promise<{
        message: string;
    }>;
    login(loginUser: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    facebookLogin(): Promise<any>;
    facebookLoginRedirect(req: any, res: any): Promise<any>;
    handleGoogleLogin(req: Request): Promise<{
        msg: string;
    }>;
    GoogleRedirect(req: any, res: any): Promise<void>;
    refreshToken(req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}

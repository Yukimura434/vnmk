import { JwtService } from '@nestjs/jwt';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/auth/schemas/user.schema';
import { Model } from 'mongoose';
export declare class CheckPermissionMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly userModel;
    constructor(jwtService: JwtService, userModel: Model<User>);
    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}

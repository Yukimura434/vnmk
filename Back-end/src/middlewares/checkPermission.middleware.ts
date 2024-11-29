import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/auth/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class CheckPermissionMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(403).json({
          message: 'Bạn cần phải đăng nhập để thực hiện hành động này!',
        });
      }

      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      console.log('decoded :', decoded);
      const user = await this.userModel.findById(decoded.userId);
      console.log('user :', user);
      if (!user) {
        return res.status(403).json({
          message: 'Token lỗi',
        });
      }

      if (user.role !== 'admin') {
        return res.status(403).json({
          message: 'Bạn không có quyền thực hiện hành động này',
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  }
}

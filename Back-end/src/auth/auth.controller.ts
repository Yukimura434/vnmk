import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

import { LoginUserDto } from './dto/login.dto';
import { GoogleAuthGuard } from './utils/GoogleAuthGuards';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { Request } from 'express';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.authService.getUserById(userId);
  }
  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  login(@Body() loginUser: LoginUserDto, @Res() res: Response) {
    return this.authService.login(loginUser, res);
  }

  @Get('/facebook/login')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
    const data = await this.authService.loginWithFacebook(req.user);

    res.redirect(
      `http://localhost:3000/auth/social/redirect?access_token=${data.access_token}&refresh_token=${data.refresh_token}&userId=${data.userId}`,
    );
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async handleGoogleLogin(@Req() req: Request) {
    return { msg: 'Google Authentication' };
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async GoogleRedirect(@Req() req, @Res() res) {
    const data = await this.authService.loginWithGoogle(req.user);
    res.redirect(
      `http://localhost:3000/auth/social/redirect?access_token=${data.access_token}&refresh_token=${data.refresh_token}&userId=${data.userId}`,
    );
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken;
    return await this.authService.refreshToken(refreshToken);
  }
}

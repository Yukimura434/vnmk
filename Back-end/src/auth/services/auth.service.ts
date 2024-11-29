import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login.dto';
import { AuthRepository } from '../repository/auth.repository';
import { Response } from 'express';
import { User } from '../schemas/user.schema';
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async loginWithGoogle(profile_google: any) {
    const displayName = profile_google.displayName;
    const username = profile_google.id;
    const avaUrl = profile_google.photos[0].value;

    let user = await this.authRepository.findUserByGoogleType(username);
    if (!user) {
      user = await this.authRepository.createUserByGoogleType(
        username,
        displayName,
        avaUrl,
      );
    }
    const token = await this.genarateToken(user.username, user._id.toString());
    return {
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
      userId: user._id.toString(),
      role: user.role,
    };
  }

  async loginWithFacebook(profile_facebook: any) {
    const displayName =
      profile_facebook._json.last_name +
      ' ' +
      profile_facebook._json.first_name;
    const username = profile_facebook._json.id;

    let user = await this.authRepository.findUserByFacebookType(username);

    if (!user) {
      user = await this.authRepository.createUserByFacebookType(
        username,
        displayName,
      );
    }
    const token = await this.genarateToken(user.username, user._id.toString());

    return {
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
      userId: user._id.toString(),
      role: user.role,
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.authRepository.findByUserName(
      registerUserDto.username,
    );

    if (user) {
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);
    }
    const hashedPassword = await this.haspassword(registerUserDto.password);

    const newUser = await this.authRepository.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });
    return {
      message: 'Register user success',
    };
  }

  async login(loginUserDto: LoginUserDto, @Res() res: Response) {
    const user = await this.authRepository.findByUserName(
      loginUserDto.username,
    );

    if (!user) {
      throw new HttpException(
        'User name is not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Password is not correct',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // update access token and refresh token
    const token = await this.genarateToken(user.username, user._id.toString());

    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    });

    return res.status(HttpStatus.OK).json({
      access_token: token.accessToken,
      refresh_token: token.refreshToken,
      userId: user._id.toString(),
      role: user.role,
    });
  }

  async refreshToken(refreshToken: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      return this.genarateToken(verify.username, verify.userId);
    } catch (err) {
      throw new HttpException(
        err.message + ' -- Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async genarateToken(username: string, userId: string) {
    const accessToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '8h',
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      { userId },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );

    await this.authRepository.findUserAndUpdateToken(
      username,
      accessToken,
      refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async getUserById(userId: string) {
    const user = await this.authRepository.findById(userId);

    return this.getExistingUser(user, userId);
  }

  getExistingUser(user: User, userId: string) {
    return {
      userId,
      type: user.type,
      userName: user.username,
      displayName: user.displayName,
      avaUrl: user.avaUrl,
      facebookId: user.facebookId,
      contactPhone: user.contactPhone,
      address: user.address,
      addressDetail: user.addressDetail,
    };
  }

  private async haspassword(password: string) {
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}

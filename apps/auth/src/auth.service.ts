import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserManagementDocument } from '../../user-management/src/models/user-management.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: UserManagementDocument, res: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload, {
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });

    res.cookie('accessToken', token, {
      httpOnly: true,
      expires,
    });
  }
}

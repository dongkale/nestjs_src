import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate({ vendor, code, redirectUri }) {
    switch (vendor) {
      case 'kakao':
        return this.kakaoLogin({ code, redirectUri });
      case 'naver':
        return this.naverLogin({ accessToken: code });
      default:
        throw new Error('지원하지 않는 로그인입니다.');
    }
  }

  async kakaoLogin({ code, redirectUri }) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: 'https://kauth.kakao.com/oauth/token',
        params: {
          grant_type: 'authorization_code',
          client_id: this.configService.get('KAKAO_CLIENT_ID'),
          client_secret: this.configService.get('KAKAO_CLIENT_SECRET'),
          redirect_uri: redirectUri,
          code,
        },
      });

      const { access_token: kakaoAccessToken } = data;

      const { data: user } = await axios({
        method: 'GET',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      });

      const { id } = user;
      const secret = this.configService.get('JWT_SECRET_KEY');
      const token = this.jwtService.sign({ id, vendor: 'kakao' }, { secret });

      const refreshToken = this.jwtService.sign({ id }, { secret });

      return { token, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async naverLogin({ accessToken: naverAccessToken }) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {
          Authorization: `Bearer ${naverAccessToken}`,
        },
      });

      const { response } = data;
      const { id } = response;
      const secret = this.configService.get('JWT_SECRET_KEY');
      const token = this.jwtService.sign({ id, vendor: 'naver' }, { secret });

      const refreshToken = this.jwtService.sign({ id }, { secret });

      return { token, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

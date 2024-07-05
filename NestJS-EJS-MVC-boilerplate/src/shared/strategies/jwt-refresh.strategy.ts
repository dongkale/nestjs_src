import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtSecretKey } from '@config';
import { STRATEGY_JWT_REFRESH } from '@shared';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, STRATEGY_JWT_REFRESH) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: jwtSecretKey,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    return { id: payload.id };
  }
}

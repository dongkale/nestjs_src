import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly configService: ConfigService) {
    super({ header: 'x-api-key', prefix: '' }, true, (apiKey, done) => {
      const isValid = apiKey === configService.get('API_KEY');
      if (!isValid) {
        return done(false);
      }
      return done(true);
    });
  }
}

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import passport from 'passport';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    passport.authenticate('headerapikey', { session: false }, value => {
      if (value) next();
      else throw new UnauthorizedException();
    })(req, res, next);
  }
}

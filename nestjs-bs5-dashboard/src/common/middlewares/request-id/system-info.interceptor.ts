import { NextFunction, Request, Response } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  res.set({
    'api-version': process.env.API_VERSION,
    'git-head': process.env.GIT_HEAD,
  });
  next();
}

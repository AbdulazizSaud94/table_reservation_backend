import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../configs/appConfig';

export class Authinticator {
  public static checkAuth(req: any, res: Response, next: NextFunction) {
    try {
      const token: string = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, config.JWT_SECRET as string);
      req.userData = decode;
      next();
    } catch (error) {
      return res.status(401).json({
        error: 'authentication failed'
      });
    }
  }

  public static adminAuth(req: any, res: Response, next: NextFunction) {
    try {
      const token: string = req.headers.authorization.split(' ')[1];
      const decode: any = jwt.verify(token, config.JWT_SECRET as string);
      if (decode.role === 'admin') {
        req.userData = decode;
        next();
      } else {
        return res.status(401).json({
          errors: 'authentication failed'
        });
      }
    } catch (error) {
      return res.status(401).json({
        error: 'authentication failed'
      });
    }
  }
}

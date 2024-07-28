import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from '../common/constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {   
    const authHeader = req.headers.authorization;        
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send('Unauthorized');
    }    
    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, { secret: jwtConstants.secret });
      (req as any).user = decoded;
      next();
    } catch (err) {      
      return res.status(401).send('Unauthorized');
    }
  }
}

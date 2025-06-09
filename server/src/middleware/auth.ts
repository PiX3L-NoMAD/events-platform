import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';

declare global {
    namespace Express {
      interface Request {
        user?: {
          uid: string;
          role?: string;
          [key: string]: any;
        };
      }
    }
  }

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing token' });
    }
    
    const token = header.split(' ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    
    req.user = {
        ...decoded,
      };
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}
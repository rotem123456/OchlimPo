import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const generateToken = (user: { id: number, email: string }) => {
  return sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || '123456789',
    { expiresIn: '24h' }
  );
};

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Missing or invalid authorization header' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      console.error('JWT_SECRET is not set in environment variables');
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    verify(token, secret, (error, decoded) => {
      if (error) {
        console.error('Token verification failed:', error.message);
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
      }
    
      const decodedPayload = decoded as JwtPayload;
      req.user = {
        id: decodedPayload.id,
        email: decodedPayload.email
      };
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

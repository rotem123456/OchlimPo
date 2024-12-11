import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
require('dotenv').config();

// Extend the Request type to include our decoded property
interface AuthenticatedRequest extends Request {
  decoded?: JwtPayload | string;
}

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
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      console.error('ACCESS_TOKEN_SECRET is not set in environment variables');
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    verify(token, secret, (error, decoded) => {
      if (error) {
        console.error('Token verification failed:', error.message);
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
      }
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
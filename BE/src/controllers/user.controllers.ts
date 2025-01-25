import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { hashSync, compare } from 'bcrypt';
import { generateToken } from '../middleware/auth';

const prisma = new PrismaClient();

export const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { email, name, password, type } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      const hashedPassword = hashSync(password, 10);
      
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          type,
        },
      });

      const token = generateToken({ 
        id: user.id, 
        email: user.email 
      });

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ error: 'Failed to create user' });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = Number(id);

      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          type: true,
        }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  getUserByMail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          type: true,
        }
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = generateToken({ 
        id: user.id, 
        email: user.email 
      });

      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};
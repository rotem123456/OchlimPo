import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import {hashSync} from 'bcrypt';

const prisma = new PrismaClient();

export const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
       
      const { email, name, password, type } = req.body;
      const hashedPassword = hashSync(password,10);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          type
        }
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create user' });
    }
  },

  getUser: async(req:Request, res: Response) => {
    try {
        const {id} = req.params;
        console.log(Number(id))
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        console.log('Found user:', user);
        if(!user)
        {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error:', error); // Debug log
        res.status(400).json({ error: 'Failed to fetch user' });
    }
  },

  getUserByMail: async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      console.log('Checking email:', email);
      
      const user = await prisma.user.findUnique({
        where: { email: email }
      });
      
      if (user) {
        console.log('Found user with email', email);
        res.sendStatus(201); 
      } else {
        console.log('No user found with email', email);
        res.sendStatus(404);
      }
    } catch (error) {
      console.error('Error checking email:', error);
      res.sendStatus(500); 
    }
}


}

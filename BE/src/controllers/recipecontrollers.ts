import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const now = new Date();

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: {
      id: number;
      email: string;
    };
  }

export const recipecontrollers = {
    createRecipe: async (req: AuthenticatedRequest, res: Response) => {
        try {
          const { name, time, shortDescription, tags, ingredients, foodCategory } = req.body;
          
          if (!req.user?.id) {
            return res.status(401).json({ error: 'User not authenticated' });
          }
    
          const recipe = await prisma.recipe.create({
            data: {
              name,
              time,
              shortDescription,
              ingredients,
              tags,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              userId: req.user.id,  
              foodCategory,
            }
          });
    
          res.status(201).json(recipe);
        } catch (error) {
          console.error('Error creating recipe:', error);
          res.status(400).json({ error: 'Failed to create recipe' });
        }
      },

    getRecipeById: async (req:Request,res: Response) => {
        try {
            const {id} = req.body
            const recipe = await prisma.recipe.findUnique({
                where: {id: Number(id)}
            })
            console.log("Found recipe ", recipe)
            res.json(recipe);

        } catch (error) {
            res.status(400).json({ error: 'Failed to get recipe' });
        }
    },
    getAllRecipeByUserId: async(req:Request, res:Response) =>
    {
        try {
            
        } catch (error) {
            
        }
    }
    
}

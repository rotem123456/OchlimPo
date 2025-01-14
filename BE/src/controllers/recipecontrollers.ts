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
    },

    getRecipeByUserQuery: async (req:Request, res: Response) => {

        console.log(req.body);

        

        try {
          const maxTime = parseInt(req.body.maxTime, 10);
          const recipes = await prisma.$queryRaw`
          SELECT * FROM "Recipe"
          JOIN (SELECT "id", "name" AS UserName FROM "User") AS "UserWithID" ON "UserWithID"."id" = "Recipe"."userId"
          JOIN (SELECT "recipeId", array_agg("type") AS tags FROM "RecipeType" GROUP BY "recipeId") AS "RecipeTags" ON "RecipeTags"."recipeId" = "Recipe"."id"
          WHERE (
              "Recipe"."name" ILIKE ${'%' + req.body.name + '%'}
              OR "Recipe"."shortDescription" ILIKE ${'%' + req.body.name + '%'}
            )
            AND CAST("Recipe"."time" AS INTEGER) > 0
            AND CAST("Recipe"."time" AS INTEGER) < ${maxTime}
            AND CAST(tags AS TEXT[]) @> CAST(ARRAY[${req.body.tags.map((tag: string) => "\'" + tag + "\'")}] AS TEXT[])
          LIMIT 20;
          `;
          console.log(`ARRAY[${req.body.tags.map((tag: string) => "\'" + tag + "\'")}]`);
          console.log(typeof req.body.tags[0]);

            res.json(recipes);

        } catch (error) {
            res.status(400).json({ error: 'Failed to get recipes from query' });
        }
    },

    getAllTags: async (req: Request, res: Response) => {
      try {
        const tags: { enumlabel: string }[] = await prisma.$queryRaw`
          SELECT enumlabel
          FROM pg_enum
          WHERE enumtypid = (
            SELECT oid
            FROM pg_type
            WHERE typname = 'FoodType'
          );
        `;
        res.json(tags.map((tag) => tag.enumlabel));
      } catch (error) {
        res.status(400).json({ error: 'Failed to get tags from query' });
      }
  },

  getAllIngredients: async (req: Request, res: Response) => {
    try {
      const ings: { enumlabel: string }[] = await prisma.$queryRaw`
        SELECT enumlabel
        FROM pg_enum
        WHERE enumtypid = (
          SELECT oid
          FROM pg_type
          WHERE typname = 'Ingredients'
        );
      `;
      res.json(ings.map((ing) => ing.enumlabel));
    } catch (error) {
      res.status(400).json({ error: 'Failed to get ingredients from query' });
    }
  }
}

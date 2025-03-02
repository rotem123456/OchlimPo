import { PrismaClient, Prisma } from '@prisma/client';
import { Request, Response } from 'express';

const now = new Date();

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
    user?: {
      id: number;
      email: string;
    };
  }

const orderByMap = new Map([
  ['Newest', ['"Recipe"."updatedAt"', 'DESC']],
  ['Oldest', ['"Recipe"."updatedAt"', 'ASC']],
  ['Fastest', ['CAST("Recipe"."time" AS INTEGER)', 'ASC']],
  ['Slowest', ['CAST("Recipe"."time" AS INTEGER)', 'DESC']],
]);

export const recipecontrollers = {
    createRecipe: async (req: AuthenticatedRequest, res: Response) => {
      console.log(req);
        try {
          const { name, time, shortDescription, tags, ingredients, foodCategory } = req.body;
          
          if (!req.user?.id) {
            return res.status(401).json({ error: 'User not authenticated' });
          }
    
          const recipe = await prisma.recipe.create({
            data: {
              name: name,
              time: `${time} minutes`,
              shortDescription,
              foodCategory,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              userId: req.user.id,
              ingredients: {
                create: ingredients.map((ing: { ingridient: any; amount: any; }) => ({
                  ingridient: ing.ingridient,
                  amount: ing.amount
                }))
              },
              tags: {
                create: tags.map((tag: any) => ({
                  type: tag
                }))
              }
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
        const tagsArray = req.body.tags.map((tag: string) => `'${tag.replace(/'/g, "''")}'`).join(',');
        const ingredientsArray = req.body.ingredients.map((ing: string) => `'${ing.replace(/'/g, "''")}'`).join(',');
  

        const orderCol = orderByMap.get(req.body.appliedOrder)?.[0] ?? 'updatedAt';
        const orderDirection = orderByMap.get(req.body.appliedOrder)?.[1] ?? 'DESC';
        console.log(orderCol, orderDirection);
  
  
        const recipes = await prisma.$queryRaw`
        SELECT * FROM "Recipe"
        JOIN (SELECT "id", "name" AS UserName FROM "User") AS "UserWithID" ON "UserWithID"."id" = "Recipe"."userId"
        JOIN (SELECT "recipeId", array_agg("type") AS tags FROM "RecipeType" GROUP BY "recipeId") AS "RecipeTags" ON "RecipeTags"."recipeId" = "Recipe"."id"
        JOIN (SELECT "recipeId", array_agg("ingridient") AS ingredients FROM "Ingredient" GROUP BY "recipeId") AS "IngredientTags" ON "IngredientTags"."recipeId" = "Recipe"."id"
        WHERE (
            "Recipe"."name" ILIKE ${'%' + req.body.name + '%'}
            OR "Recipe"."shortDescription" ILIKE ${'%' + req.body.name + '%'}
          )
          AND (CAST(REGEXP_REPLACE("Recipe"."time", '[^0-9]', '', 'g') AS INTEGER) > 0)
          AND (CAST(REGEXP_REPLACE("Recipe"."time", '[^0-9]', '', 'g') AS INTEGER) < ${maxTime})
          AND CAST(tags AS TEXT[]) @> CAST(ARRAY[${Prisma.raw(tagsArray)}] AS TEXT[])
          AND CAST(ingredients AS TEXT[]) @> CAST(ARRAY[${Prisma.raw(ingredientsArray)}] AS TEXT[])
        ORDER BY ${Prisma.raw(orderCol)} ${Prisma.raw(orderDirection)}
        LIMIT 20;
        `;
  
          res.json(recipes);
  
      } catch (error) {
          console.log(error);
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
  },

  getRecipeFeed: async (req:Request, res: Response) => {

    console.log(req.params.id);
    try {
      const id = req.params.id;
      const recipes = await prisma.$queryRaw`
      SELECT * FROM "Recipe"
      JOIN (SELECT "id", "name" AS UserName FROM "User") AS "UserWithID" ON "UserWithID"."id" = "Recipe"."userId"
      JOIN (SELECT "recipeId", array_agg("type") AS tags FROM "RecipeType" GROUP BY "recipeId") AS "RecipeTags" ON "RecipeTags"."recipeId" = "Recipe"."id"
      JOIN (SELECT "recipeId", array_agg("ingridient") AS ingredients FROM "Ingredient" GROUP BY "recipeId") AS "IngredientTags" ON "IngredientTags"."recipeId" = "Recipe"."id"
      JOIN (SELECT "recipeId", CAST(count(*) AS INTEGER) AS likes  FROM "RecipeLikes" GROUP BY "recipeId") AS "RecipeLikes" ON "RecipeLikes"."recipeId" = "Recipe"."id"
      WHERE "userId" != CAST(${id} AS INTEGER)
        AND "userId" IN (
          SELECT "toUserId"
          FROM "UserLikes"
          WHERE "fromUserId" = CAST(${id} AS INTEGER)
        )
      ORDER BY "Recipe"."createdAt" DESC
      LIMIT 50;
      `;

        res.json(recipes);

    } catch (error) {
        console.log("getRecipeFeed")
        res.status(400).json({ error: error });
    }
},
}

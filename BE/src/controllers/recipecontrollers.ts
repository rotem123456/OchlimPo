import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const now = new Date();

const prisma = new PrismaClient();
/** 
model Recipe {
    id          Int         @id @default(autoincrement())
    name        String
    time        Float 
    shortDescription String @default("No Description Added")
    tags        RecipeType[]  
    ingredients Ingredient[]   
    user     User @relation(fields: [userId], references: [id])
    userId Int
    createdAt   DateTime    @default(now())
    updatedAt   DateTime    @updatedAt
    foodCategory FoodCategory
     @@index([userId])
   }
*/
export const recipecontrollers = {
    createRecipe: async (req: Request, res: Response) => {
        const time = String(now.toTimeString().split(' ')[0])
    try {
        const {name,time,shortDescription ,tags,ingredients,foodCategory } = req.body;
        const userId = (req as any).user?.id
        const recipe = await prisma.recipe.create({
            data:{
                name,
                time,
                shortDescription,
                ingredients,
                tags,
                createdAt: time,
                updatedAt: time,
                userId,
                foodCategory,
            }
        })
        res.status(201).json(recipe);
    } catch (error) {
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
    }
}

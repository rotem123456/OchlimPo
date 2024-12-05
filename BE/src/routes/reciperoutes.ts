import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { recipecontrollers } from '../controllers/recipecontrollers';

const router = Router();
router.post('/recipe/create', recipecontrollers.createRecipe);
router.get('/recipe/:id', recipecontrollers.getRecipeById);

export default router;
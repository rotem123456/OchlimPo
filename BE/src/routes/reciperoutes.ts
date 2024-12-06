import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { recipecontrollers } from '../controllers/recipecontrollers';

const router = Router();
router.post('/create', recipecontrollers.createRecipe);
router.get('/:id', recipecontrollers.getRecipeById);

export default router;
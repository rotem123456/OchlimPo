import { Router, Request, Response } from 'express';
import { recipecontrollers } from '../controllers/recipecontrollers';
import { authenticateToken } from '../middleware/auth';

const router = Router();
router.post('/create', authenticateToken ,recipecontrollers.createRecipe);
router.get('/:id',recipecontrollers.getRecipeById);

export default router;
import { Router, Request, Response } from 'express';
import { recipecontrollers } from '../controllers/recipe.controllers';
import { authenticateToken } from '../middleware/auth';

const router = Router();
router.post('/create', authenticateToken ,recipecontrollers.createRecipe);
router.get('/tags', recipecontrollers.getAllTags);
router.get('/ingredients', recipecontrollers.getAllIngredients);
router.get('/feed/:id', recipecontrollers.getRecipeFeed);
router.post('/search', recipecontrollers.getRecipeByUserQuery);
router.get('/:id', recipecontrollers.getRecipeById);

export default router;
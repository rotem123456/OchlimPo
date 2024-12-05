import express from 'express';
import { PrismaClient } from '@prisma/client';
import { userController } from '../controllers/usercontrollers';
import { recipecontrollers } from '../controllers/recipecontrollers';



const router = express.Router();

router.post('/user/create', userController.createUser);
router.get('/user/:id',userController.getUser);
router.post('/recipe/create', recipecontrollers.createRecipe);
router.get('/recipe/:id', recipecontrollers.getRecipeById);

export default router;
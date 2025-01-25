import express from 'express';
import { PrismaClient } from '@prisma/client';
import { userController } from '../controllers/user.controllers';


const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login',userController.login)
router.get('/email/:email', userController.getUserByMail);
router.get('/:id',userController.getUser);

export default router;
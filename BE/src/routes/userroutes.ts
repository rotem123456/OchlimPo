import express from 'express';
import { PrismaClient } from '@prisma/client';
import { userController } from '../controllers/usercontrollers';



const router = express.Router();

router.post('/create', userController.createUser);
router.get('/email/:email', userController.getUserByMail);
router.get('/:id',userController.getUser);

export default router;
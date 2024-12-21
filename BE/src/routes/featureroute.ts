import { Router, Request, Response } from 'express';
import { featureController } from '../controllers/featurecontroller';
const router = Router();

router.get('/location',featureController.getlocation)
router.get('/weather',featureController.getWeather)
export default router;
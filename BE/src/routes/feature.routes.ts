import { Router, Request, Response } from 'express';
import { featureController } from '../controllers/feature.controllers';
const router = Router();

router.get('/location',featureController.getlocation)
router.get('/weather',featureController.getWeather)
export default router;
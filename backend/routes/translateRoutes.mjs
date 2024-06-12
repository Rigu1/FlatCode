import { Router } from 'express';
import { translateText } from '../controllers/translateController.mjs';

const router = Router();

router.post('/', translateText);

export default router;

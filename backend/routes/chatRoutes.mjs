import { Router } from 'express';
import { chatHandler } from '../controllers/chatController.mjs';

const router = Router();

router.post('/', chatHandler);

export default router;

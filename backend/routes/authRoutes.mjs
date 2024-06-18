import { Router } from 'express';
import { registerUser, loginUser, logoutUser, checkAuth } from '../controllers/authController.mjs';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', checkAuth);

export default router;

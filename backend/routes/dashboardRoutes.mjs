import express from 'express';
import { getDashboards, addDashboard, deleteDashboard, addBoardToDashboard, removeBoardFromDashboard, updateBoardType } from '../controllers/dashboardController.mjs';
import { checkAuth } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/', checkAuth, getDashboards);
router.post('/', checkAuth, addDashboard);
router.delete('/:id', checkAuth, deleteDashboard);
router.post('/:id/boards', checkAuth, addBoardToDashboard);
router.delete('/:id/boards', checkAuth, removeBoardFromDashboard);
router.put('/:id/boards', checkAuth, updateBoardType); // Add this line

export default router;

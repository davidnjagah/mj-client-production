import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { handleImageGen } from '../controllers/processImageController';

const router = Router();


router.post('/', authMiddleware, handleImageGen);

export default router;

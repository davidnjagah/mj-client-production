import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import { handleImageGen } from '../controllers/processImageController';

const fetchImages = Router();


fetchImages.post('/', authMiddleware, handleImageGen);


export default fetchImages;

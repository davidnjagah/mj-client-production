import { Router } from 'express';
import { check } from '../controllers/check';

const checkRouter = Router();

checkRouter.post('/', check);

export default checkRouter;

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import authMiddleware from './middleware/authMiddleware';

import { check } from './controllers/check';
import { handleImageGen } from './controllers/processImageController';
import { paystackWebhook } from './controllers/paystack-webhook';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


app.use('/api/fetchimages', authMiddleware, handleImageGen);
app.use('/api/webhook', paystackWebhook);
app.use('/api/checkroute', check)

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => console.log("Server running on port 5000"));

export default app;

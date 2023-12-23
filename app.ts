import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import fetchImages from './routes/fetchImages';
import checkRouter from './routes/checkRoute';
import paystack from './routes/paystack';

import { notFound, errorHandler } from './middleware/errorMiddleware';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));


app.use('/api/fetchimages', fetchImages);
app.use('/api/webhook', paystack);
app.use('/api/checkroute', checkRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => console.log("Server running on port 5000"));

export default app;

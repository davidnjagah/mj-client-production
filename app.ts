import createError from 'http-errors';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import fetchImages from './routes/fetchImages';
import { notFound, errorHandler } from './middleware/errorMiddleware';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use('/api/fetchimages', fetchImages);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => console.log("Server running on port 5000"));

export default app;

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/error-middleware';

import hotelRouter from './routers/hotelRouter';

// Initialize the express app
const app = express();

// Use middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Use routers
app.use('/hotels', hotelRouter);

// Error handling middleware
app.use(errorMiddleware);

export default app;

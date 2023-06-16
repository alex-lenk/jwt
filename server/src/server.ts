import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import * as http from 'http';
import hotelRouter from './routers/hotelRouter';
import loginRouter from './routers/loginRouter';
import errorMiddleware from './middlewares/error-middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Use middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Use routers
app.use('/hotels', hotelRouter);
app.use('/login', loginRouter);

// Error handling middleware
app.use(errorMiddleware);

async function start() {
  try {
    await connect(process.env.DB_URL as string);

    console.log('Connected to MongoDB');

    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}/`);
    });
  } catch (e) {
    console.log('Error:', e as Error);
    process.exit(1);
  }
}

start().catch(err => console.log(err));

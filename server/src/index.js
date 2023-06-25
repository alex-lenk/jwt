require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
// const { expressjwt: jwt } = require('express-jwt');

const router = require('./router/');
// const ApiError = require('./exceptions/api-error');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

// app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

/*
app.use(jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
  }).unless({
    path: ['/api/login', '/api/register'],
  }),
);
*/

app.use('/api', router);

/*
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    // Use your custom ApiError class to handle the UnauthorizedError from express-jwt
    err = ApiError.UnauthorizedError();
  }
  next(err); // Pass the error to your errorMiddleware
});
*/

app.use(errorMiddleware);

const start = async () => {
  try {
    mongoose.connect(process.env.DB_URL, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server started on port = ${ PORT }`);
    });
  } catch (error) {
    console.log(error);
  }
};

start().then(() => console.log('started for dev!'));

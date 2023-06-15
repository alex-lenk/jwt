import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { User } from '../models/User';
import ApiError from '../exceptions/api-error';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if (!user) {
    throw ApiError.BadRequest('User does not exist');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.BadRequest('Invalid credentials');
  }

  const oneTimeCode = crypto.randomBytes(3).toString('hex');
  user.oneTimeCode = oneTimeCode;
  await user.save();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    to: user.email,
    subject: 'Your one-time login code',
    text: `Here is your one-time login code: ${ oneTimeCode }`,
  });

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET!,
    {expiresIn: process.env.JWT_ACCESS_EXPIRES_IN},
    (err, token) => {
      if (err) throw err;
      res.json({token});
    },
  );
};

export const verify = async (req: Request, res: Response) => {
  const {email, code} = req.body;
  const user = await User.findOne({email});

  if (!user) {
    throw ApiError.BadRequest('User does not exist');
  }

  if (user.oneTimeCode !== code) {
    throw ApiError.BadRequest('Invalid code');
  }

  // If the code is valid, clear it
  user.oneTimeCode = undefined;
  await user.save();

  res.json({msg: 'Code verified'});
};

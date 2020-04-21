import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pick } from 'lodash';

import userModel from '../models/user';

export const login = async (req, res) => {
  const replacement = pick(req.body, ['email', 'password']);
  const { email, password } = replacement;

  try {
    const user = await userModel.findByEmail(email);

    if (!user) {
      return res.sendStatus(404);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.sendStatus(404);
    }

    const token = await jwt.sign({
      userId: user.id,
      email: user.email,
      // userId: 7,
      // email: 'froggy@gmail.com',
    },
    process.env.APP_KEY,
    {
      expiresIn: '7d',
    });

    const { id } = user;

    return res.status(200)
      .set('token', token)
      .send(id === 7);
    // .send(true);
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

export const checkAuth = async (req, res) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const isLogin = await jwt.verify(token, process.env.APP_KEY);
    const { userId } = isLogin;

    res.status(200).send(userId === 7);
  } catch (error) {
    const { message } = error;

    if (message === 'jwt expired') {
      return res.sendStatus(403);
    }

    return res.sendStatus(401);
  }
};

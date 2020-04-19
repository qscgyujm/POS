import jwt from 'jsonwebtoken';

export default async (req, res, next) => {
  const token = req.get('Authorization');

  if (!token) {
    return res.sendStatus(401).send('no token');
  }

  try {
    const isLogin = await jwt.verify(token, process.env.APP_KEY);

    if (!isLogin) {
      return res.sendStatus(410);
    }
    console.log(isLogin);

    req.userId = isLogin.userId;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }

  // req.userId = 7;
  // next();
};

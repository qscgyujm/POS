import express from 'express';
import cors from 'cors';

import testRouter from './test';

import protectApiRouter from './protectApi';

const router = express.Router();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  exposedHeaders: ['Content-Type', 'Authorization', 'token'],
};

/* GET home page. */
router.get('/dev', (req, res) => {
  res.send('POS API');
});

router.use('/test', testRouter);

router.use('/api', cors(corsOptions), protectApiRouter);

export default router;

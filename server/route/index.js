import express from 'express';
import cors from 'cors';

import testRouter from './test';

const router = express.Router();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  exposedHeaders: ['Content-Type', 'Authorization', 'token'],
};

router.use(cors(corsOptions));

/* GET home page. */
router.get('/', (req, res) => {
  res.send('POS API');
});

router.use('/test', testRouter);

export default router;

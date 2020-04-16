import express from 'express';
import cors from 'cors';
import multer from 'multer';

import testRouter from './test';
import protectApiRouter from './protectApi';

import * as authController from '../controllers/auth';
import * as verifyController from '../controllers/verify';
import * as userController from '../controllers/users';

const router = express.Router();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  exposedHeaders: ['Content-Type', 'Authorization', 'token'],
};

router.get('/dev', (req, res) => {
  res.send('POS API');
});

router.use('/test', testRouter);

// Auth
router.post('/api/auth/login', cors(corsOptions), multer().array(), authController.login);
router.post('/api/auth/check', cors(corsOptions), authController.checkAuth);

// Login Verify
router.post('/api/auth/sendCode', verifyController.sendCode);
router.post('/api/auth//checkCode', verifyController.checkCode, userController.createUser);

router.use('/api', cors(corsOptions), protectApiRouter);

export default router;

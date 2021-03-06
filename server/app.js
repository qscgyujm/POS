import 'dotenv/config';

import express from 'express';
import logger from 'morgan';
import path from 'path';
import helmet from 'helmet';

import apiRouter from './route';

const app = express();

app.disable('x-powered-by'); // express recommend
app.use(helmet()); // express recommend

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(apiRouter);

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

export default app;

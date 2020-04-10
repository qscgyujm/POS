import 'dotenv/config';

import express from 'express';
import logger from 'morgan';
import path from 'path';

import apiRouter from './route';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(apiRouter);

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

export default app;

// module.exports = app;

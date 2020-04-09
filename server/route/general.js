import express from 'express';

import uploadFileMiddlerWare from '../middleware/uploadFile';

import * as generalController from '../controllers/general';

const router = express.Router();

router.get('/uploadFile', (req, res) => {
  res.send('FileUpload');
});

router.post('/uploadImg',
  uploadFileMiddlerWare,
  generalController.fileUpload);

export default router;

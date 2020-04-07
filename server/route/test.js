import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.send('POS API'));

router.post('/post', (req, res) => {
  console.log(req.body);

  return res.send('POST ');
});


export default router;

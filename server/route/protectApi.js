import express from 'express';

import * as productController from '../controllers/product';
import * as userProductController from '../controllers/user-product';

import AuthMiddler from '../middleware/auth';

const router = express.Router();

router.use(AuthMiddler);

// Product
router.get('/product/all', productController.findAllProduct);
router.post('/product/create', productController.createProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

// User-Product
router.get('/user/product', userProductController.getUserProductInfo);
router.post('/user/product', userProductController.addUserProductMiddleware, userProductController.getUserProductInfo);
router.delete('/user/product/:id', userProductController.deleteProductMiddleware, userProductController.getUserProductInfo);

export default router;

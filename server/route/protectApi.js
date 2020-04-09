import express from 'express';

import generalRoute from './general';

import * as productController from '../controllers/product';
import * as userProductController from '../controllers/user-product';
import * as orderController from '../controllers/order';

import AuthMiddler from '../middleware/auth';

const router = express.Router();

router.use(AuthMiddler);

// File
router.use('/general', generalRoute);

// Product
router.get('/product/all', productController.findAllProduct);
router.post('/product/create', productController.createProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

// User-Product
router.get('/user/product', userProductController.getUserProductInfo);
router.post('/user/product', userProductController.addUserProductMiddleware, userProductController.getUserProductInfo);
router.delete('/user/product/:id', userProductController.deleteProductMiddleware, userProductController.getUserProductInfo);

// Order
router.get('/order', orderController.fetchOrderByUserId);
router.post('/order/create', orderController.createOrder);
router.put('/order/submit/:id', orderController.updateOrderSubmit);
router.delete('/order/:id', orderController.deleteOrder);


export default router;

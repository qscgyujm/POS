import { pick } from 'lodash';

import orderModel from '../models/order';
import productModel from '../models/product';

import { getTime } from '../helper/time';

export async function fetchOrderByUserId(req, res) {
  const { userId } = req;
  try {
    const newOrderList = await orderModel.findAllOrderByUserId(userId);
    const orderDetailList = newOrderList.map((order) => ({
      ...order,
      list: JSON.parse(order.list),
    }));

    return res.status(200).json({
      orderDetailList,
    });
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function createOrder(req, res) {
  const { userId } = req;

  try {
    const orderNumber = await orderModel.findMaxOrderId();

    const orders = req.body.order;
    console.log('orders', orders);

    const replacements = orders.map((order) => [
      orderNumber + 1,
      order.p_id,
      userId,
      order.count,
      order.price * order.count,
      getTime(),
      getTime(),
    ]);

    if (!await orderModel.insertMany(replacements)) {
      return res.sendStatus(401);
    }

    return res.status(200).send();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function updateOrderMiddleware(req, res, next) {
  const orderId = pick(req.params, 'id').id;

  try {
    const updateCount = await orderModel.updateSubmission({
      order_id: orderId,
    });

    if (updateCount !== 1) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function dealOrderMiddleware(req, res, next) {
  const orderId = pick(req.params, 'id').id;

  try {
    const updateCount = await orderModel.updateDealOrder(orderId);

    if (updateCount === 0) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function deleteOrderMiddleware(req, res, next) {
  const orderId = pick(req.params, 'id').id;

  try {
    if (!await orderModel.delete(orderId)) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(404);
  }
}

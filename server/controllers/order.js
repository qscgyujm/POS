import { pick } from 'lodash';

import orderModel from '../models/order';
import productModel from '../models/product';

import { getTime } from '../helper/time';

const convertDetailOrderList = (orderList) => orderList
  .map((order) => ({
    ...order,
    productIdAry: order.productIdAry.split(','),
    quantityAry: order.quantityAry.split(','),
  }))
  .map((order) => ({
    ...order,
    detailOrder: order.productIdAry.map((id, i) => ({
      id,
      quantity: order.quantityAry[i],
    })),
  }))
  .map((order) => pick(order, ['order_id', 'totalPrice', 'detailOrder', 'createdAt']));

export async function fetchOrderByUserId(req, res) {
  const { userId } = req;
  try {
    const orderList = await orderModel.findByUserId(userId);

    const orderDetailList = convertDetailOrderList(orderList);

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

    const orderProductIds = orders.map((order) => order.id);
    const productList = await productModel.findByIds(orderProductIds);

    const replacements = orders.map((order) => {
      const productInfo = productList.find((product) => product.p_id === order.id);
      return [
        orderNumber + 1,
        productInfo.p_id,
        userId,
        order.count,
        productInfo.price * order.count,
        getTime(),
        getTime(),
      ];
    });

    if (!await orderModel.insertMany(replacements)) {
      return res.sendStatus(401);
    }

    return res.status(200).send();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function updateOrderSubmit(req, res) {
  const { userId } = req;

  try {
    const orderId = pick(req.params, 'id').id;

    const updateCount = await orderModel.updateSubmission({
      order_id: orderId,
    });

    if (updateCount !== 1) {
      return res.sendStatus(401);
    }

    const orderList = await orderModel.findByUserId(userId);
    const orderDetailList = convertDetailOrderList(orderList);

    return res.status(200).json({
      orderDetailList,
    });
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function deleteOrder(req, res) {
  const { userId } = req;

  try {
    const orderId = pick(req.params, 'id').id;

    if (!await orderModel.delete(orderId)) {
      return res.sendStatus(401);
    }

    const orderList = await orderModel.findByUserId(userId);
    const orderDetailList = convertDetailOrderList(orderList);

    return res.status(200).json({
      orderDetailList,
    });
  } catch (error) {
    return res.sendStatus(404);
  }
}

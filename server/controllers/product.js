import { pick, isNil } from 'lodash';

import productModel from '../models/product';
import orderModel from '../models/order';
import userProductModel from '../models/user-product';

import { getTime } from '../helper/time';

export async function createProduct(req, res) {
  const placement = {
    ...pick(req.body, ['name', 'price']),
    description: req.body.description ? req.body.description : null,
    imageUrl: req.body.imageUrl ? req.body.imageUrl : null,
  };

  try {
    const createStatue = await productModel.insert(placement);

    if (!createStatue === 1) {
      res.sendStatus(404).end();
    }

    const products = await productModel.findAll();

    return res.status(200).send(products);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function findAllProduct(req, res) {
  try {
    const products = await productModel.findAll();

    return res.status(200).send(products);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function findProductById(req, res) {
  const productId = pick(req.params, 'id').id;

  try {
    const products = await productModel.findByIds(productId);

    return res.status(200).json(products[0]);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function updateProduct(req, res) {
  const productId = pick(req.params, 'id').id;
  const newProduct = pick(req.body, ['name', 'description', 'price', 'imageUrl']);

  try {
    const oldProduct = await productModel.findByIds(productId);

    if (isNil(oldProduct)) {
      return res.sendStatus(404);
    }

    const replacements = {
      ...oldProduct[0],
      ...newProduct,
      id: productId,
      updatedAt: getTime(),
    };

    const updatedProductCount = await productModel.update(replacements);

    if (updatedProductCount === 0) {
      return res.sendStatus(404);
    }

    const products = await productModel.findAll();

    return res.status(200).send(products);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function deleteProduct(req, res) {
  const { userId } = req;
  const productId = pick(req.params, 'id').id;

  try {
    if (!orderModel.deleteByProductId(productId)) {
      return res.sendStatus(401);
    }

    const replacements = {
      userId,
      productId,
    };

    if (!await userProductModel.delete(replacements)) {
      return res.sendStatus(401);
    }

    if (!await productModel.delete(productId)) {
      return res.sendStatus(404);
    }

    const products = await productModel.findAll();

    return res.status(200).send(products);
  } catch (error) {
    return res.sendStatus(401);
  }
}

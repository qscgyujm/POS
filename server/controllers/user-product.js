import { pick, isEmpty } from 'lodash';

import productModel from '../models/product';
import userProductModel from '../models/user-product';

import { getTime } from '../helper/time';

export async function getUserProductInfo(req, res) {
  const { userId } = req;

  try {
    const Ids = await userProductModel.findAllByUserId(userId);

    if (isEmpty(Ids)) {
      return res.status(200).json([]);
    }

    const allProductList = await productModel.findAll();

    if (isEmpty(allProductList)) {
      return res.sendStatus(401);
    }

    const productList = allProductList.filter((product) => Ids.find((id) => product.p_id === id));
    const deletedProducts = allProductList
      .filter((product) => !Ids.find((id) => product.p_id === id));

    return res.status(200).json({
      productList,
      deletedProducts,
    });
  } catch (error) {
    return res.sendStatus(401);
  }
}


export async function addUserProductMiddleware(req, res, next) {
  const { userId } = req;
  const { ids } = pick(req.body, ['ids']);

  try {
    console.log('addUserProductMiddleware', ids);
    const replacements = ids.map((id) => [
      userId,
      id,
      getTime(),
      getTime(),
    ]);

    const createCount = await userProductModel.insertMany(replacements);
    console.log('createCount', createCount);

    if (createCount !== ids.length) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function deleteProductMiddleware(req, res, next) {
  const { userId } = req;
  const { id } = pick(req.params, ['id']);

  try {
    const replacements = {
      userId,
      productId: id,
    };

    if (!await userProductModel.delete(replacements)) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

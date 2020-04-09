import productModel from '../models/product';
import userProductModel from '../models/user-product';

import { getTime } from '../helper/time';

const list = [
  {
    name: 'AA-Test',
    description: 'asdf',
    price: 11.11,
    imageUrl: 'https://project-side.s3.ap-northeast-1.amazonaws.com/458-cat.jpeg',
  },
  {
    name: 'BB-Test',
    description: 'asdf',
    price: 11.11,
    imageUrl: 'https://project-side.s3.ap-northeast-1.amazonaws.com/145-cat2.jpg',
  },
  {
    name: 'CCC-Test',
    description: 'asdf',
    price: 11.11,
    imageUrl: 'https://project-side.s3.ap-northeast-1.amazonaws.com/458-cat.jpeg',
  },
  {
    name: 'EEEEE-Test',
    description: 'asdf',
    price: 11.11,
    imageUrl: 'https://project-side.s3.ap-northeast-1.amazonaws.com/458-cat.jpeg',
  },
  {
    name: 'asdf-Test',
    description: 'aaa',
    price: 1,
    imageUrl: 'https://project-side.s3.ap-northeast-1.amazonaws.com/364-dog2.jpg',
  },
];


export async function product(req, res) {
  try {
    const replacements = list.map((ls) => [
      ls.name,
      ls.description,
      ls.price,
      ls.imageUrl,
      getTime(),
      getTime(),
    ]);

    const createCount = await productModel.insertMany(replacements);

    if (createCount !== list.length) {
      return res.sendStatus(401);
    }
    return res.status(200).send();
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function createUserProduct(req, res) {
  const userId = 7;

  try {
    const createCount = await userProductModel.insertBulk(userId);

    if (createCount === 0) {
      return res.sendStatus(401);
    }

    return res.status(200).send();
  } catch (error) {
    return res.sendStatus(401);
  }
}

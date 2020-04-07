/* eslint no-useless-catch: "off" */

import { QueryTypes } from 'sequelize';

import appDB from '../db/sql';

class Product {
  constructor(dataPool) {
    this.dataPool = dataPool;
  }

  async findByIds(ids) {
    const sql = 'SELECT * from products WHERE p_id IN (:ids)';

    try {
      const products = await this.dataPool.query(
        sql,
        {
          replacements: {
            ids,
          },
          type: QueryTypes.SELECT,
        },
      );

      return products;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const sql = 'SELECT * from products';

    try {
      const products = await this.dataPool.query(
        sql,
        {
          type: QueryTypes.SELECT,
        },
      );

      return products;
    } catch (error) {
      throw error;
    }
  }

  async insert(replacements) {
    const sql = `
      INSERT INTO products(
        name,
        description,
        price,
        imageUrl,
        createdAt,
        updatedAt
      ) VALUES (
        :name,
        :description,
        :price,
        :imageUrl,
        NOW(),
        NOW()
      )
  `;

    try {
      const product = await this.dataPool.query(
        sql,
        {
          replacements,
          type: QueryTypes.INSERT,
        },
      );

      return product[1];
    } catch (error) {
      throw error;
    }
  }

  async update(replacements) {
    const sql = `
      UPDATE products
      SET
        name = :name,
        description= :description,
        price= :price,
        imageUrl= :imageUrl,
        updatedAt= :updatedAt
      WHERE p_id = :id
    `;

    try {
      const updatedProduct = await this.dataPool.query(
        sql,
        {
          replacements,
          type: QueryTypes.UPDATE,
        },
      );

      return updatedProduct[1];
    } catch (error) {
      throw error;
    }
  }


  async delete(id) {
    const sql = `
      DELETE FROM products
      WHERE p_id = :id
    `;

    try {
      await this.dataPool.query(sql, {
        replacements: {
          id,
        },
        type: QueryTypes.DELETE,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}

const ProductsRepo = new Product(appDB);

export default ProductsRepo;

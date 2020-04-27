import { QueryTypes } from 'sequelize';

import appDB from '../db/sql';

class UserProducts {
  constructor(dataPool) {
    this.dataPool = dataPool;
  }

  async findAllUserProductById(id) {
    const sql = `
      SELECT 
        up.product_id, 
        p.name, p.description, 
        p.price, p.imageUrl, 
        p.createdAt, 
        p.updatedAt
      FROM users_product as up
      LEFT JOIN products as p ON up.product_id = p.p_id
      WHERE up.user_id = :id
    `;

    try {
      const res = await this.dataPool.query(
        sql,
        {
          replacements: {
            id,
          },
          type: QueryTypes.SELECT,
        },
      );

      return res;
    } catch (error) {
      return [];
    }
  }

  async insertMany(replacements) {
    const sql = `
      INSERT INTO users_product(
        user_id,
        product_id,
        createdAt,
        updatedAt
      ) VALUES ?
    `;

    try {
      const [firstId, createCount] = await this.dataPool.query(
        sql,
        {
          replacements: [replacements],
          type: QueryTypes.INSERT,
        },
      );

      return createCount;
    } catch (error) {
      return null;
    }
  }

  async delete(replacements) {
    const sql = `
      DELETE FROM users_product
      WHERE 
        product_id = :productId
        AND user_id = :userId
    `;

    try {
      await this.dataPool.query(
        sql, {
          replacements,
          type: QueryTypes.DELETE,
        },
      );

      return true;
    } catch (error) {
      return false;
    }
  }
}


const UserProductsRepo = new UserProducts(appDB);

export default UserProductsRepo;

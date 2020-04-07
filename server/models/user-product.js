import { QueryTypes } from 'sequelize';

import appDB from '../db/sql';

class UserProducts {
  constructor(dataPool) {
    this.dataPool = dataPool;
  }

  async findAllByUserId(id) {
    const sql = `
      SELECT product_id FROM users_product
      WHERE user_id = :id
    `;

    try {
      const ids = await this.dataPool.query(
        sql,
        {
          replacements: {
            id,
          },
          type: QueryTypes.SELECT,
        },
      );


      return id !== [] ? ids.map((pId) => pId.product_id) : [];
    } catch (error) {
      return [];
    }
  }

  async insert(replacements) {
    const sql = `
      INSERT INTO users_product(
        user_id,
        product_id,
        createdAt,
        updatedAt
      ) VALUES (
        :userId,
        :productId,
        NOW(),
        NOW()
      )
    `;

    try {
      const [id, createCount] = await this.dataPool.query(
        sql,
        {
          replacements,
          type: QueryTypes.INSERT,
        },
      );

      return createCount;
    } catch (error) {
      return null;
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

  async insertBulk(id) {
    const sql = `
      INSERT INTO users_product(
        user_id,
        product_id,
        createdAt,
        updatedAt
      )
      SELECT
        :id,
        p_id,
        NOW(),
        NOW()
      FROM products
    `;

    try {
      const [firstId, createCount] = await this.dataPool.query(
        sql,
        {
          replacements: {
            id,
          },
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

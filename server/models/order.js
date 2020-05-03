/* eslint no-useless-catch: "off" */
import { QueryTypes } from 'sequelize';

import appDB from '../db/sql';

class OrderRepo {
  constructor(dataPool) {
    this.dataPool = dataPool;
  }

  async findMaxOrderId() {
    const sql = 'SELECT COALESCE(MAX(order_id), 0) as maxNumber from orders';

    try {
      const res = await this.dataPool.query(sql, {
        type: QueryTypes.SELECT,
      });

      return res[0].maxNumber;
    } catch (error) {
      throw error;
    }
  }

  async findAllOrderByUserId(id) {
    const sql = `
      SELECT 
        o.order_id, 
        Concat(
          '[', 
          Group_concat(
            Json_object( 
              'id', p.p_id, 
              'name', p.name, 
              'price', p.price,
              'quantity', o.quantity
            )
          ), 
          ']'
        ) AS list,
        SUM(o.price) as totalPrice,
        o.createdAt
      FROM orders AS o 
      LEFT JOIN products AS p ON o.product_id = p.p_id 
      WHERE  
        user_id = :id
        AND iscomplete = 0 
      GROUP  BY o.order_id 
    `;

    try {
      const results = await this.dataPool.query(
        sql,
        {
          replacements: {
            id,
          },
          type: QueryTypes.SELECT,
        },
      );
      return results;
    } catch (error) {
      return error;
    }
  }


  async findByUserId(userId) {
    const sql = `
      SELECT
        order_id,
        SUM(price) as totalPrice, 
        GROUP_CONCAT(product_id) as productIdAry,
        GROUP_CONCAT(quantity) as quantityAry,
        GROUP_CONCAT(price) as priceAry,
        createdAt
      from orders 
      WHERE user_id = :userId
        AND isComplete = 0
      GROUP BY order_id;
    `;

    try {
      const results = await this.dataPool.query(
        sql,
        {
          replacements: {
            userId,
          },
          type: QueryTypes.SELECT,
        },
      );
      return results;
    } catch (error) {
      return error;
    }
  }

  async insertMany(replacements) {
    const sql = `
      INSERT INTO orders(
        order_id,
        product_id,
        user_id,
        quantity,
        price,
        createdAt,
        updatedAt
      ) VALUES ?
    `;

    try {
      const insertResult = await this.dataPool.query(
        sql,
        {
          replacements: [replacements],
          type: QueryTypes.INSERT,
        },
      );

      console.log('insertResult', insertResult);

      return true;
    } catch (error) {
      return error;
    }
  }

  async updateDealOrder(id) {
    const sql = `
      UPDATE orders
        SET
          isComplete = 1
        WHERE order_id = :id
    `;

    try {
      const [, updateCount] = await this.dataPool.query(sql, {
        replacements: {
          id,
        },
        type: QueryTypes.UPDATE,
      });


      console.log(updateCount);
      return updateCount;
    } catch (error) {
      return error;
    }
  }

  async delete(id) {
    const sql = `
      DELETE FROM orders
      WHERE order_id = :id
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
      return error;
    }
  }

  async deleteByProductId(id) {
    const sql = `
      DELETE FROM orders
      WHERE product_id = :id
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
      return error;
    }
  }
}

const orderRepo = new OrderRepo(appDB);

export default orderRepo;

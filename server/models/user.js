/* eslint no-useless-catch: "off" */
import { QueryTypes } from 'sequelize';

import appDB from '../db/sql';

class User {
  constructor(dataPool) {
    this.dataPool = dataPool;
  }

  async findById(id) {
    const sql = 'SELECT * from users WHERE id = :id';

    try {
      const user = await this.dataPool.query(
        sql,
        {
          replacements: {
            id,
          },
          type: QueryTypes.SELECT,
        },
      );

      console.log('findUser', user);
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email) {
    const sql = 'SELECT * from users WHERE email = :email';

    try {
      const user = await this.dataPool.query(
        sql,
        {
          replacements: {
            email,
          },
          type: QueryTypes.SELECT,
        },
      );

      console.log('findUser', user);
      return user[0];
    } catch (error) {
      throw error;
    }
  }

  async createUser(replacements) {
    const sql = `
      INSERT INTO users(
        email,
        password,
        name,
        location,
        createdAt,
        updatedAt
      ) VALUES (
        :email,
        :password,
        :name,
        :location,
        NOW(),
        NOW()
      )
    `;

    try {
      const [firstId, createCount] = await this.dataPool.query(
        sql,
        {
          replacements,
          type: QueryTypes.INSERT,
        },
      );

      return createCount;
    } catch (error) {
      return error;
    }
  }

  async updateUser(replacements) {
    const sql = `
      UPDATE users
      SET
        name = :name,
        location= :location,
        updatedAt= :updatedAt
      WHERE id = :id
    `;

    try {
      const updatedRes = await this.dataPool.query(
        sql,
        {
          replacements,
          type: QueryTypes.UPDATE,
        },
      );

      console.log(updatedRes);
      return updatedRes[1];
    } catch (error) {
      return error;
    }
  }
}


const UserRepo = new User(appDB);

export default UserRepo;

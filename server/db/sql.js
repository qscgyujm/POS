import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'mariadb',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected');
  })
  .catch(() => {
    console.log('Connect DB Error');
    process.exit(1);
  });

export default sequelize;

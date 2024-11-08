import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import * as pg from "pg";

dotenv.config();

console.log(process.env.SERVER_PORT);

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // nanti aja setup jadi truenya
      },
    },
  }
);

export default db;

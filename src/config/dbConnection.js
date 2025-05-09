import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const connectionDb = await mysql.createConnection(
  process.env.DB_CONNECTION,
);

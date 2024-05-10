import dotenv from 'dotenv';

dotenv.config();

export const DATA_BASE_CONFIGURATION = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

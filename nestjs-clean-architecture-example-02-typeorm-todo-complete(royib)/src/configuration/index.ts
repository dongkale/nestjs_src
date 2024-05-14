import dotenv from 'dotenv';

dotenv.config();

export const DATA_BASE_CONFIGURATION = {
  HOST: process.env.DB_HOST as string,
  PORT: process.env.DB_PORT as string,
  DB_NAME: process.env.DB_NAME as string,
  DB_USERNAME: process.env.DB_USERNAME as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
};

// DB configuration can be added here
import dotenv from 'dotenv';
dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

export default{
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
};
// export const host = process.env.DB_HOST;
// export const user = process.env.DB_USER;
// export const password = process.env.DB_PASSWORD;
// export const database = process.env.DB_NAME;



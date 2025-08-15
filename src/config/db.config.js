// DB configuration can be added here
const dotenv = require('dotenv');
dotenv.config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

module.exports = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
};



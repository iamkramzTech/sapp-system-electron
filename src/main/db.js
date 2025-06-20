import mysql from 'mysql2';
import dbConfig from '../config/db.config.js';

const { host, user, password, database } = dbConfig;
export const databaseConnection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});
// console.log(`App Version: ${process.env.APP_VERSION}`);
// console.log(`NodeJS environment: ${process.env.NODE_ENV}`);

databaseConnection.connect(error => {
  if (error) {
    console.error('X Database connection failed:', error.message);
    // console.log(`Database Name: ${process.env.DB_NAME} host: ${process.env.DB_HOST} user: ${process.env.DB_USER} pass: ${process.env.DB_PASSWORD}`);
  } else {
    console.log('Successfully Connected to MySQL');
    // console.log(`Database Name: ${process.env.DB_NAME} host: ${process.env.DB_HOST} user: ${process.env.DB_USER} pass: ${process.env.DB_PASSWORD}`);
  }
});
// require('dotenv').config();
const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const databaseConnection = mysql.createConnection(dbConfig);
console.log(`NodeJS environment:${process.env.NODE_ENV}`);

console.log(`Line above databaseConnection Database Name:${process.env.DB_NAME} host:${process.env.DB_HOST} user:${process.env.DB_USER} pass:${process.env.DB_PASSWORD}`);
// const databaseConnection = mysql.createConnection({
//   host:process.env.DB_HOST,
//   user:process.env.DB_USER,
//   password:process.env.DB_PASSWORD,
//   database:process.env.DB_NAME
// });

databaseConnection.connect(error => {
  if (error) {
   // console.log(`Database Name:${dbConfig.database} host:${dbConfig.host} user:${dbConfig.user} pass:${dbConfig.password}`);
    console.log(`Database Name:${process.env.DB_NAME} host:${process.env.DB_HOST} user:${process.env.DB_USER} pass:${process.env.DB_PASSWORD}`);
    console.error('X Database connection failed:', error.message);
  } else {
    console.log('Successfully Connected to MySQL');
    console.log(`Database Name:${process.env.DB_NAME} host:${process.env.DB_HOST} user:${process.env.DB_USER} pass:${process.env.DB_PASSWORD}`);
    // console.log(`Database Name:${dbConfig.database} host:${dbConfig.host} user:${dbConfig.user} pass:${dbConfig.password}`);
  }
});

module.exports = databaseConnection;

const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const { host, user, password, database } = dbConfig;
const databaseConnection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
});

module.exports = { databaseConnection };


databaseConnection.connect(error => {
  if (error) {
    console.error('X Database connection failed:', error.message);
   
  } else {
    console.log('Successfully Connected to MySQL');
    
  }
});
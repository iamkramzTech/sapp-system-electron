const mysql = require('mysql2');
const dbConfig = require('../config/db.config');

const databaseConnection = mysql.createConnection(dbConfig);

databaseConnection.connect(error => {
  if (error) {
    // console.log(`Database:${dbConfig.database} host:${dbConfig.host} user:${dbConfig.user} pass:${dbConfig.password}`);
    console.error('❌ MySQL connection failed:', error.message);
  } else {
    console.log('✅ Connected to MySQL');
    //console.log(`Database:${dbConfig.database} host:${dbConfig.host} user:${dbConfig.user} pass:${dbConfig.password}`);
  }
});

module.exports = databaseConnection;

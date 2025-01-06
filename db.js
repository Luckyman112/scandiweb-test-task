const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kolobok20041', 
  database: 'scandiweb_test', 
});

module.exports = pool;

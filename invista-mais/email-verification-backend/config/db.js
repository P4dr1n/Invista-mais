const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
pool.getConnection()
  .then(conn => {
    console.log('Conectado ao MySQL!');
    conn.release();
  })
  .catch(err => {
    console.error('Erro de conexão com MySQL:', err);
    process.exit(1); // Encerra o processo se não conectar
  });
module.exports = pool;
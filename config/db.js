const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'bibliotecadb',
    password: process.env.DB_PASSWORD || '123456',
    waitForConnections: true, 
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise(); // llamado asincrono

pool.getConnection((err, connection) => {
    if (err) {
        console.log(`error en la vida (conexion)`);        
    } else {
        console.log(`wola, estas conectado a la db`);
        connection.release();
    }
});

module.exports = promisePool;
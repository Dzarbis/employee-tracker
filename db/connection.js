const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'StarkVader12!',
        database: 'tracker'
    },
    console.log('Connected to the tracker database.')
);

module.exports = db;
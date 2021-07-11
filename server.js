const db = require('./db/connection');
const main = require('./utils/functions');

// db.query(`SELECT * FROM employees`, (err, rows) => {
//     console.log(rows);
// });

// db.query(`SELECT * FROM employees WHERE id = 1`, (err, row) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(row);
// });

// db.query(`DELETE FROM employees WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
//                 VALUES (?, ?, ?, ?, ?)`;
// const params = [1, 'Peter', 'Quill', 1, undefined];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });
function init() {
    main.menu();
};

init();
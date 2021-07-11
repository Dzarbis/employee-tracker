const inquirer = require('inquirer');
const db = require('../db/connection');

function menu() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        pageSize: 12,
        message: 'Please choose from the following options:',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            new inquirer.Separator(),
            'Update employee role',
            new inquirer.Separator(),
            'Add a department',
            'Add a role',
            'Add an employee',
            new inquirer.Separator(),
            'Quit'
        ]
    }).then((res) => {
        switch (res.menu) {
            case 'View all departments':
                viewDep();
                break;
            case 'View all roles':
                viewRole();
                break;
            case 'View all employees':
                viewEmp();
                break;
            case 'Update employee role':
                updateEmpRole();
                break;
            case 'Add a department':
                addDep();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmp();
                break;
            case 'Quit':
                console.log('Goodbye.')
                db.end();
                break;
            default:
                console.log(`Something went wrong.`)
        }
    })
};

function viewDep() {
    const params = 'SELECT * FROM departments'

    db.query(params, function (err, res) {
        if (err) throw err;
        console.table(res)
        menu();
    })
};

function viewRole() {
    const params = 'SELECT * FROM roles'

    db.query(params, function (err, res) {
        if (err) throw err;
        console.table(res)
        menu();
    })
};

function viewEmp() {
    const params = 'SELECT * FROM employees'

    db.query(params, function (err, res) {
        if (err) throw err;
        console.table(res)
        menu();
    })
};

function updateEmpRole() {
    var params = 'SELECT e.first_name, e.last_name, r.title, e.manager_id, e.id FROM tracker.employees as e LEFT JOIN roles as r on e.role_id = r.id';
    var empList = [];
    db.query(params, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            empList.push({ name: res[i].first_name + ' ' + res[i].last_name, value: res[i].id });
        };
        var params2 = 'SELECT * FROM roles';
        var roles = [];
        db.query(params2, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                roles.push({ name: res[i].title, value: res[i].id })
            };
        });

        inquirer.prompt([
            {
                type: 'list',
                name: 'emp',
                message: 'Which employee would you like to update?',
                choices: empList
            },
            {
                type: 'list',
                name: 'new_role',
                message: 'What is this employees new role?',
                choices: roles
            }
        ]).then(function(res){
            var params3 = 'UPDATE employees SET role_id = ? WHERE id = ?';
            db.query(params3, [res['new_role'], res['emp']], function(err, res) {
                if (err) throw err;
                console.log('Employee role updated!');
                menu();
            })
        })
    })
};

function addDep() {
    inquirer.prompt({
        type: 'input',
        name: 'new_dep',
        message: 'What is the new department you want to add?'
    }).then(function(answer) {
        var params = 'INSERT INTO departments SET ?';
        db.query(params, { name: answer['new_dep']}, function(err, res) {
            if (err) throw err;
            console.log('New department added!');
            menu();
        })
    })
};

function addRole() {
    var params = 'SELECT * FROM departments';
    var departments = [];
    db.query(params, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            departments.push({ name: res[i].name, value: res[i].id })
        }
    })
    inquirer.prompt([
        {
            type: 'input',
            name: 'new_role',
            message: 'What is the new role titled?'
        },
        {
            type: 'input',
            name: 'new_sal',
            message: 'What is the salary of this role?'
        },
        {
            type: 'list',
            name: 'new_home',
            message: 'What department is this new role homed in?',
            choices: departments
        }
    ]).then(function(answer) {
        var params2 = 'INSERT INTO roles SET ?';
        db.query(params2, { title: answer['new_role'], salary: answer['new_sal'], department_id: answer['new_home']}, function(err, res) {
            if (err) throw err;
            console.log('The new role has been added!');
            menu();
        })
    })
};

function addEmp() {
    var params = 'SELECT * FROM departments';
    var departments = [];
    db.query(params, function (err, res) {
        if (err) throw err;
        for (var i = 0; i< res.length; i++) {
            departments.push({ name: res[i].name, value: res[i].id });
        }
        var params2 = 'SELECT * FROM roles';
        var roles = [];
        db.query(params2, function (err, res) {
            if (err) throw err;
            for (var i = 0; i < res.length; i++) {
                roles.push({ name: res[i].title, value: res[i].id })
            }
            var params3 = 'SELECT * FROM employees WHERE role_id IN (1, 3, 5, 7, 9)';
            var managers = [];
            db.query(params3, function (err, res) {
                if (err) throw err;
                for (var i =0; i < res.length; i++) {
                    managers.push({ name: res[i].first_name, name: res[i].last_name, value: res[i].id });
                }
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'new_first',
                        message: "What is the new employee's first name?"
                    },
                    {
                        type: 'input',
                        name: 'new_last',
                        message: "What is the new employee's last name?"
                    },
                    {
                        type: 'list',
                        name: 'new_job',
                        message: "What is the new employee's role?",
                        choices: roles
                    },
                    {
                        type: 'list',
                        name: 'new_boss',
                        message: "Who is the new employee's manager?",
                        choices: managers
                    }
                ]).then(function(answers) {
                    var params4 = 'INSERT INTO employees SET ?';
                    db.query(params4, { first_name: answers['new_first'], last_name: answers['new_last'], role_id: answers['new_job'], manager_id: answers['new_boss']}, function (err, res) {
                        if (err) throw err;
                        console.log('New employee added!');
                        menu();
                    })
                })
            })
        })
    })
};

module.exports = { menu }
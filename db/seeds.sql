INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Front Desk'),
    ('Food and Beverage'),
    ('Housekeeping');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Manager', 100000, 1),
    ('Salesperson', 50000, 1),
    ('Engineering Manager', 100000, 2),
    ('Engineer', 50000, 2),
    ('Front Desk Manager', 100000, 3),
    ('Front Desk Agent', 50000, 3),
    ('Restaurant Manager', 100000, 4),
    ('Server', 50000, 4),
    ('Housekeeping Manager', 100000, 5),
    ('Housekeeper', 50000, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Peter', 'Quill', 1, NULL),
    ('Gam', 'Ora', 2, 1),
    ('Rocket', 'Raccoon', 2, 1),
    ('Tony', 'Stark', 3, NULL),
    ('Peter', 'Parker', 4, 4),
    ('James', 'Rhodes', 4, 4),
    ('Steve', 'Rogers', 5, NULL),
    ('Bucky', 'Barnes', 6, 7),
    ('Sam', 'Wilson', 6, 7),
    ('Scott', 'Lang', 7, NULL),
    ('Hope', 'VanDyne', 8, 10),
    ('Hank', 'Pym', 8, 10),
    ('Nick', 'Fury', 9, NULL),
    ('Maria', 'Hill', 10, 13),
    ('Phil', 'Coulson', 10, 13);

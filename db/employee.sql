DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;
DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) 
);
DROP TABLE IF EXISTS role;

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);
DROP TABLE IF EXISTS department;

CREATE TABLE employee(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) ,
    last_name VARCHAR(30),
    role_id INT ,
    manager_id INT DEFAULT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES  employee(id) ON DELETE SET NULL  

);
SHOW COLUMNS FROM department;
SHOW COLUMNS FROM role;
SHOW COLUMNS FROM employee;
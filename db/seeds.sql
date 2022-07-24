INSERT INTO department(name)
VALUES ("Frontend", "Backend", "Design");
INSERT INTO role(title, salary, department_id)
VALUES("Frontend Engineer I", 100000,1), ("Frontend Engineer II", 140000, 1), ("Frontend Team Lead", 180000,1 ),
("Backend Engineer I", 100000,2), ("Backend Engineer II", 140000, 2), ("Backend Team Lead", 180000,2),
("UX Designer", 90000, 3), ("Artist", 75000,3), ("Design Team Lead", 120000, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("John", "Doe", 1, null), ("Jane", "Dove", 1, 1), ("Josh", "Atkins", 2, null), ("Hannah", "Montana", 3, 2);

SELECT * FROM department;
SELECT * FROM role; 
SELECT * FROM employee;
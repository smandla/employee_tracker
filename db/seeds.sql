
-- INSERT INTO department (department_name )
-- VALUES  ("Engineering"), 
--         ("Marketing"),
--         ("Inspiration");

-- INSERT INTO role (title, salary, department_id)
-- VALUES  ("Engineer", 130000, 1),
--         ("Cheif Engineer", 200000, 1),
--         ("Social Media Specialist", 120000, 2),
--         ("Head of Marketing", 190000, 2),
--         ("Poet", 120000, 3);
     
-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES  ("Joni", "Mitchell", 2, null),  
--         ("Neil", "Young", 4, null),  
--         ("Cat", "Stevens", 1, 1),
--         ("Bram", "Stoker", 1, 1),
--         ("Dr.", "Frankenstein", 3, 2);



INSERT INTO department (name)
VALUES ("Frontend"), ("Backend"), ("Design");

INSERT INTO role (title, salary, department_id)
VALUES ("Frontend Engineer I", 100000,1), 
 ("Frontend Team Lead", 180000,1),
("Backend Engineer II", 140000, 2),
 ("Backend Team Lead", 180000,2),
("UX Designer", 90000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
  ("Josh", "Atkins", 2, null), 
  ("Hannah", "Montana", 3, 2);

SELECT * FROM department;
SELECT * FROM role; 
SELECT * FROM employee;


const inquirer = require("inquirer");
const mysql = require("mysql2");
//promise wrapper
const mysqlPromise = require("mysql2/promise");

/**
 *
 */

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_db",
});

var roles = [];
var departments = [];
var employees = ["None"];
connection.query(
  `SELECT role.id, role.title, department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id=department.id`,
  function (err, results) {
    console.log("\n");
    console.table(results);
  }
);
// connection.query(
//   `SELECT id FROM department WHERE name="HR"`,
//   function (err, results) {
//     console.log("\n");
//     console.log(results[0].id);
//   }
// );
//   const [rows, fields] = await connection.execute("SELECT * FROM department");
//   console.table(rows);
function chooseOption() {
  const optionQuestion = {
    name: "option",
    message: "What would you like to do?",
    type: "list",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Exit",
    ],
  };
  inquirer.prompt(optionQuestion).then((answers) => {
    console.log(answers);
    switch (answers.option) {
      case "View All Departments":
        logTable(`SELECT * FROM department`);

        break;
      case "View All Employees":
        connection.query(`SELECT * FROM employee`, function (err, results) {
          console.log("\n");
          console.table(results);
          console.log("\n");
        });
        chooseOption();
        break;
      case "View All Roles":
        connection.query(`SELECT * FROM role`, function (err, results) {
          console.log("\n");
          console.table(results);
          console.log("\n");
        });
        chooseOption();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "Add Role":
        addRole();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      default:
        return "";
    }
  });
}
function updateEmployeeRole() {
  const questions = [
    {
      name: "employee_id",
      message: "Which employee's role do you want to update?",
      type: "list",
      choices: getManagers(),
    },
    {
      name: "employee_role",
      message: "Which role do you want to assign the selected employee?",
      type: "list",
      choices: getRoles(),
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    console.log(answers);
  });
}
function addDepartment() {
  const questions = [
    { name: "department_name", message: "What is the name of the department?" },
  ];
  inquirer.prompt(questions).then((answers) => {
    connection.query(
      `INSERT INTO department (name) VALUES (${`"${answers.department_name}"`})`,
      function (err, results) {
        // console.log("\n");
        console.log(`\n Added ${answers.department_name} to the database`);
      }
    );
    chooseOption();
    // break;
  });
}
var managerId;
function addEmployee() {
  //  TODO: fix role choices with roles from db
  const questions = [
    { name: "first_name", message: "What is the employee's first name?" },
    { name: "last_name", message: "What is the employee's last name?" },
    {
      name: "role",
      message: "What is the employee's role?",
      type: "list",
      choices: getRoles(),
    },
    {
      name: "manager_id",
      message: "Who is the employee's manager?",
      type: "list",
      choices: getManagers(),
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    console.log(answers.role, answers.manager_id.split(" ")[0]);
    /**
     * TODO: add last name also for better check
     * TODO: add conditional for if "None" is entered
     */

    connection.query(
      `SELECT id FROM employee WHERE first_name="${
        answers.manager_id.split(" ")[0]
      }" AND last_name="${answers.manager_id.split(" ")[1]}"`,
      function (err, results) {
        console.log("\n");
        // console.log(results[]);
        managerId = results[0].id;
        // return results[0].id;
        connection.query(
          `SELECT id FROM role WHERE title="${answers.role}"`,
          function (err, results) {
            console.log("\n");
            console.log(results);
            id = results[0].id;
            console.log("id", id);
            // console.log("manager", id_manager);
            console.log(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${`"${answers.first_name}","${answers.last_name}",${id}, ${managerId}`})`
            );
            connection.query(
              `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${`"${answers.first_name}","${answers.last_name}",${id}, ${managerId}`})`,
              function (err, results) {
                // console.log("\n");
                console.log(
                  `\n Added ${answers.first_name} to the emloyee table`
                );
              }
            );
          }
        );
      }
    );

    chooseOption();
    // break;
  });
}
var id;
function addRole() {
  const questions = [
    { name: "role_name", message: "What is the name of the role?" },
    { name: "salary", message: "What is the salary of the role?" },
    {
      name: "department",
      message: "What department does the role belong to?",
      type: "list",
      choices: getDepartment(),
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    console.log(answers.department);

    connection.query(
      `SELECT id FROM department WHERE name="${answers.department}"`,
      function (err, results) {
        console.log("\n");
        console.log(results);
        id = results[0].id;
        console.log("id", id);
        console.log(
          `INSERT INTO role (title, salary, department_id) VALUES (${`"${answers.role_name}",${answers.salary},${id}`})`
        );
        connection.query(
          `INSERT INTO role (title, salary, department_id) VALUES (${`"${answers.role_name}",${answers.salary},${id}`})`,
          function (err, results) {
            // console.log("\n");
            console.log(`\n Added ${answers.role_name} to the role table`);
          }
        );
      }
    );

    chooseOption();
    // break;
  });
}
function getDepartment() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (results) {
      results.forEach(function (department) {
        // console.log(department);
        department.push(department.name);
      });
    }
  });
  return department;
}
function getRoles() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (results) {
      results.forEach(function (role) {
        // console.log(role);
        roles.push(role.title);
        // department.push(roles.);
      });
    }
  });
  console.log(roles);
  return roles;
}
function getManagers() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (results) {
      results.forEach(function (employee) {
        // console.log(department);
        employees.push(`${employee.first_name} ${employee.last_name}`);
      });
    }
  });
  return employees;
}
function logTable(stmt) {
  connection.query(stmt, function (err, results) {
    console.log("\n");
    console.table(results);
    console.log("\n");
  });
  chooseOption();
}
function init() {
  //   data();
  getRoles();
  //   getDepartment();
  chooseOption();
}
init();

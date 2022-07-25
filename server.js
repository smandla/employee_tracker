const inquirer = require("inquirer");
const mysql = require("mysql2");
//promise wrapper
const mysqlPromise = require("mysql2/promise");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee_db",
});
// connection.query(`SELECT * FROM department`, function (err, results) {
//   console.log("\n");
//   console.table(results);
// });
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
        });
        chooseOption();
        break;
      case "View All Roles":
        connection.query(`SELECT * FROM role`, function (err, results) {
          console.log("\n");
          console.table(results);
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
        // addDepartment();
        break;
      default:
        return "";
    }
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

function addEmployee() {
  //  TODO: fix role choices with roles from db
  const questions = [
    { name: "first_name", message: "What is the employee's first name?" },
    { name: "last_name", message: "What is the employee's last name?" },
    {
      name: "role",
      message: "What is the employee's role?",
      type: "list",
      choices: [0, 1, 2],
    },
    {
      name: "manager_id",
      message: "What is the employee's role?",
      type: "list",
      choices: [0, 1, 2],
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    console.log(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${`"${answers.first_name}","${answers.last_name}",${answers.role}, null`})`
    );
    connection.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${`"${answers.first_name}","${answers.last_name}",${answers.role}, null`})`,
      function (err, results) {
        // console.log("\n");
        console.log(`\n Added ${answers.first_name} to the emloyee table`);
      }
    );
    chooseOption();
    // break;
  });
}
// function addDepartment() {
//     const questions = [
//       { name: "department_name", message: "What is the name of the department?" },
//     ];
//     inquirer.prompt(questions).then((answers) => {
//       connection.query(
//         `INSERT INTO department (name) VALUES (${`"${answers.department_name}"`})`,
//         function (err, results) {
//           // console.log("\n");
//           console.log(`\n Added ${answers.department_name} to the database`);
//         }
//       );
//       chooseOption();
//       // break;
//     });
//   }
function logTable(stmt) {
  connection.query(stmt, function (err, results) {
    console.log("\n");
    console.table(results);
  });
  chooseOption();
}
function init() {
  //   data();
  chooseOption();
}
init();

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
      default:
        return "";
    }
  });
}
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

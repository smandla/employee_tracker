const inquirer = require("inquirer");
const mysql = require("mysql2");
//promise wrapper
const mysqlPromise = require("mysql2/promise");
function init() {
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
  });
}
init();

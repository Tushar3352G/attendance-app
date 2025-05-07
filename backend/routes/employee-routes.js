const express = require("express");
const {
  createEmployee,
  deleteEmployee,
  editEmployee,
  allEmployees,
} = require("../controllers/employee-controller");
const Router = express.Router();

Router.get("/", allEmployees);
Router.post("/", createEmployee);
Router.put("/:id", editEmployee);
Router.delete("/:id", deleteEmployee);

module.exports = Router;

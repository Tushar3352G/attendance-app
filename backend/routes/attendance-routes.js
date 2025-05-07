const express = require("express");
const {
  employeeAttendance,
  employeeAttendanceRecord,
} = require("../controllers/attendance-controller");
const Router = express.Router();

Router.post("/", employeeAttendance);
Router.get("/:id", employeeAttendanceRecord);

module.exports = Router;

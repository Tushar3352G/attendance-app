const express = require("express");
const Router = express.Router();
const authRoutes = require("./auth-routes");
const employeeRoutes = require("./employee-routes");
const attendanceRoutes = require("./attendance-routes");
const leaveRoutes = require("./leave-routes");
const { isAdmin, isAuthenticated } = require("../middlewares/isAuthenticated");

Router.get("/ping", (req, res) => {
  res.status(200).json({
    status: "working",
    message: "PONG",
  });
});
Router.use("/auth", authRoutes);
Router.use("/employees", isAuthenticated, isAdmin, employeeRoutes);
Router.use("/attendance",  isAuthenticated, attendanceRoutes);
Router.use("/leave", isAuthenticated, leaveRoutes);

module.exports = Router;

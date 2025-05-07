require("dotenv").config();
const express = require("express");
const app = express();
const apiRoutes = require("../routes/api-routes");
const connectToDb = require("../config/db");
const cors = require("cors");
const serverless = require('serverless-http')
connectToDb();

app.use(cors({
  origin:'*',
}));

app.options("*", cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/api/ping");
});
app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    message: error.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
});

module.exports = app
module.exports.handler = serverless(app)
const express = require("express");
const {
  loginController,
  registerController,
  tokenRefresh,
  authMeController,
} = require("../controllers/auth-controller");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const Router = express.Router();

Router.post("/login", loginController);

if (process.env.NODE_ENV === "development") {
  Router.post("/register", registerController);
}

Router.get("/me", isAuthenticated, authMeController);
Router.get("/refresh", isAuthenticated, tokenRefresh);

module.exports = Router;

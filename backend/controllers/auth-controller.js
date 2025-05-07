const { employeeModel } = require("../models/employee-model");
const { hashChecker, hashMaker } = require("../utils/hashGenerator");
const { tokenMaker } = require("../utils/tokenGenerator");

module.exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "All fields are required",
      });
    }

    const employee = await employeeModel
      .findOne({ email })
      .populate("attendance")
      .populate("leaveRequests");
    if (!employee) {
      return res.status(401).json({
        status: 401,
        message: "Email or password is incorrect",
      });
    }

    const isHashVerify = await hashChecker(employee.password, password);
    if (!isHashVerify) {
      return res.status(401).json({
        status: 401,
        message: "Email or password is incorrect",
      });
    }

    const token = tokenMaker(employee._id);
    res.status(200).json({
      status: 200,
      message: "Successfully Login",
      token,
      employee
    });
  } catch (err) {
    next(err);
  }
};

module.exports.registerController = async (req, res, next) => {
  try {
    const { name, email, password, role, department } = req.body;
    const admin = await employeeModel.findOne({
      email,
    });
    if (admin) {
      return res.status(400).json({
        status: 400,
        message: "This service is not available",
      });
    }
    const hashpassword = await hashMaker(password);
    const adminCreated = await employeeModel.create({
      name,
      email,
      password: hashpassword,
      role,
      department,
    });
    res.status(201).json({
      status: 201,
      message: "Successfully Created Admin",
      admin: adminCreated,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.authMeController = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(400).json({
        status: 400,
        message: "Unauthorized",
      });

    res.status(200).json({
      status: 200,
      user,
      message: "successfully me",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.tokenRefresh = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(400).json({
        status: 400,
        message: "Unauthorized",
      });

    const token = tokenMaker(user._id);
    res.status(200).json({
      status: 200,
      message: "successfully refresh",
      token,
    });
  } catch (err) {
    next(err);
  }
};

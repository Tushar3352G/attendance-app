const { employeeModel } = require("../models/employee-model");
const { tokenChecker } = require("../utils/tokenGenerator");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - Invalid token",
      });
    }

    const isValidToken = tokenChecker(token);

    if (!isValidToken || !isValidToken.id) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - Invalid token",
      });
    }

    const user = await employeeModel
      .findOne({ _id: isValidToken.id })
      .select("-password")
      .populate("attendance")
      .populate("leaveRequests");
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized - User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports.isAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (!role) {
      return res.status(400).json({
        status: 400,
        message: "Unauthorized",
      });
    }

    if (role !== "admin") {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};

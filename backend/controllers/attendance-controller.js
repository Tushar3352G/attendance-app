const {
  validateAttendance,
  attendanceModel,
} = require("../models/attendance-model");
const { employeeModel } = require("../models/employee-model");

module.exports.employeeAttendance = async (req, res, next) => {
  try {
    const { id, status, date, time } = req.body;

    const employee = await employeeModel.findOne({ _id: id });
    if (!employee) {
      return res.status(400).json({
        status: 400,
        message: "employee not found",
      });
    }

    const { value, error } = validateAttendance({
      employeeId: id,
      status,
      date,
      time,
    });
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details,
      });
    }

    const attendance = await attendanceModel.create(value);
    employee.attendance.push(attendance._id);
    await employee.save();

    res.status(201).json({
      status: 201,
      message: status === "clock-in" ? "Good Morning" : "Good Evening",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.employeeAttendanceRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await employeeModel.findOne({ _id: id }).populate({
      path: "attendance",
      select: "-__v -createdAt -updatedAt",
    });

    if (!employee) {
      return res.status(400).json({
        status: 400,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      status: 200,
      attendance: employee.attendance,
    });
  } catch (err) {
    next(err);
  }
};

const { employeeModel, validateEmployee } = require("../models/employee-model");
const { hashMaker } = require("../utils/hashGenerator");

module.exports.createEmployee = async (req, res, next) => {
  try {
    const { employeename, email, password, department, leavebalance } = req.body;
    const { value, error } = validateEmployee({
      name:employeename,
      email,
      password,
      department,
      leaveBalance:leavebalance,
    });

    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details,
      });
    }

    const employee = await employeeModel.findOne({ email });
    if (employee)
      return res.stauts(400).json({
        status: 400,
        message: "employee already exisited with this email",
      });

    const hashpassword = await hashMaker(password);

    await employeeModel.create({ ...value, password: hashpassword });

    res.status(201).json({
      status: 201,
      message: "Successfully Created New Employee",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.allEmployees = async (req, res, next) => {
  try {
    const employees = await employeeModel
      .find({ role: { $ne: "admin" } })
      .select("-password")
      .select("-__v")
      .select("-updatedAt");

    const formattedEmployees = employees.map((emp) => ({
      employeeId:emp._id,
      name: emp.name,
      email: emp.email,
      role: emp.role,
      department: emp.department,
      leavebalance: emp.leaveBalance,
      attendance: emp.attendance.length,
      leaves_Requests: emp.leaveRequests.length,
    }));

    res.status(200).json({
      status: 200,
      message: "Request Successfully",
      employees: formattedEmployees,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.editEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, department, leaveBalance } = req.body;

    if (!name || !email || !password || !department || !leaveBalance) {
      return res.status(400).json({
        status: 400,
        message: "fields are required and cannot be empty",
      });
    }

    const employee = await employeeModel.findOne({ _id: id });
    if (!employee) {
      return res.status(404).json({
        status: 404,
        message: "Employee not found",
      });
    }

    employee.name = name;
    employee.email = email;
    employee.password = password;
    employee.department = department;
    employee.leaveBalance = leaveBalance;
    await employee.save();

    res.status(200).json({
      status: 200,
      message: "Employee updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findOne({ _id: id });

    if (!employee) {
      return res.status(404).json({
        status: 404,
        message: "Employee not found",
      });
    }

    await employeeModel.deleteOne({ _id: employee._id });

    res.status(200).json({
      status: 200,
      message: "Employee deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

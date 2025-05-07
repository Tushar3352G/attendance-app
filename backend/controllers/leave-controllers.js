const { employeeModel } = require("../models/employee-model");
const { validateLeave, leaveModel } = require("../models/leave-model");

module.exports.createLeave = async (req, res, next) => {
  try {
    const { id, leavetype, startdate, enddate } = req.body;
    if (!id || !leavetype || !startdate || !enddate) {
      return res.status(400).json({
        status: 400,
        message: "All Field are Requird, Not be Empty",
      });
    }

    const employee = await employeeModel.findOne({ _id: id });
    if (!employee)
      return res.status(400).json({
        status: 400,
        message: "Employee Not Found",
      });
    const { value, error } = validateLeave({
      employeeId: id,
      leaveType:leavetype,
      startDate:startdate,
      endDate:enddate,
    });

    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details,
      });
    }

    const leave = await leaveModel.create(value);
    employee.leaveRequests.push(leave._id);
    await employee.save();

    res.status(200).json({
      status: 200,
      message: "Leave created successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.employeAllLeaves = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel
      .findOne({ _id: id })
      .populate({
        path:"leaveRequests",
        select:'-createdAt -updatedAt -__v'
      });
    if (!employee) {
      return res.status(400).json({
        status: 400,
        message: "Employee Not Founded",
      });
    }
    res.status(200).json({
      status: 200,
      leaves: employee.leaveRequests,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.allLeaves = async (req,res,next) =>{
  try {
    const leaves = await leaveModel.find().populate('employeeId')

    const formattedLeave = leaves.map((leave) => ({
      id:leave._id,
      name: leave.employeeId.name,
      email: leave.email,
      status: leave.status,
      start_Date: leave.startDate,
      end_Date: leave.endDate,
    }));

    res.status(200).json({
     status:200,
     message:'Request Success',
     leaves:formattedLeave
    })
  } catch (err) {
    next(err)
  }
}

module.exports.leaveApprove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const leave = await leaveModel.findOne({ _id: id });
    if (!leave) {
      return res.status(400).json({
        status: 400,
        message: "this leave not found",
      });
    }
    leave.status = "approved";
    await leave.save();

    res.status(200).json({
      status: 200,
      message: "Leave status updated to approved",
    });
  } catch (err) {
    next(err);
  }
};

module.exports.leaveReject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const leave = await leaveModel.findOne({ _id: id });
    if (!leave) {
      return res.status(400).json({
        status: 400,
        message: "this leave not found",
      });
    }
    leave.status = "rejected";
    await leave.save();

    res.status(200).json({
      status: 200,
      message: "Leave status updated to rejected",
    });
  } catch (err) {
    next(err);
  }
};

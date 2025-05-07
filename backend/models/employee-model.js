const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "employee"],
      default: "employee",
    },
    department: {
      type: String,
      required: true,
    },
    leaveBalance: {
      type: Number,
      required: true,
      default: 0,
    },
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attendance",
      },
    ],
    leaveRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leave",
      },
    ],
  },
  {
    timestamps: true,
  }
);

function validateEmployee(employee) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("admin", "employee"),
    department: Joi.string().required(),
    leaveBalance: Joi.number().min(0).required(),
  });

  return schema.validate(employee);
}

module.exports = {
  employeeModel: mongoose.model("employee", employeeSchema),
  validateEmployee,
};

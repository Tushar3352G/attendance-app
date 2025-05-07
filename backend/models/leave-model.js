const mongoose = require("mongoose");
const Joi = require("joi");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["sick", "vacation", "casual", "other"],
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

function validateLeave(leave) {
  const schema = Joi.object({
    employeeId: Joi.string().required(),
    leaveType: Joi.string()
      .valid("sick", "vacation", "casual", "other")
      .required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    status: Joi.string().valid("pending", "approved", "rejected"),
  });

  return schema.validate(leave);
}

module.exports = {
  leaveModel: mongoose.model("leave", leaveSchema),
  validateLeave,
};

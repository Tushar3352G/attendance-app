const mongoose = require("mongoose");
const Joi = require("joi");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: ["clock-in", "clock-out"],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

function validateAttendance(attendance) {
  const schema = Joi.object({
    employeeId: Joi.string().required(),
    status: Joi.string().valid("clock-in", "clock-out").required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
  });

  return schema.validate(attendance);
}

module.exports = {
  attendanceModel: mongoose.model("attendance", attendanceSchema),
  validateAttendance,
};

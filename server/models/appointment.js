const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  startTime: Number,
  endTime: Number,
  status: String,
  visitorName: String,
  specialistName: String,
  notes: String
});

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;

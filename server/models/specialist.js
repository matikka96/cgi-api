const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialistSchema = new Schema({
  name: String,
  role: String
});

const Specialist = mongoose.model("specialist", specialistSchema);

module.exports = Specialist;

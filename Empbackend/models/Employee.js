const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  location:String,
  image: String
});

module.exports = mongoose.model('employee', EmployeeSchema);

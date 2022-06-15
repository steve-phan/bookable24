const mongoose = require("mongoose")
require("dotenv").config()

const Schema = mongoose.Schema

const customerSchema = new Schema({
  firstName: String,
  lastName: String,
  fullname: String,
  email: String,
  phone: String,
})

module.exports = { customerSchema }

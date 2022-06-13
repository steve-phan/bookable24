const mongoose = require("mongoose")
require("dotenv").config()

const Schema = mongoose.Schema

const customerSchema = new Schema({
  first_name: String,
  last_name: String,
  fullname: String,
  email: String,
  phone: String,
})

module.exports = { customerSchema }

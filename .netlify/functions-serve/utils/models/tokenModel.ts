import mongoose from "mongoose"
require("dotenv").config()

const Schema = mongoose.Schema

export const tokenSchema = new Schema({
  token: String,
  expiry: String,
})

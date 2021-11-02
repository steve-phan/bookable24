import mongoose from "mongoose"
require("dotenv").config()

const Schema = mongoose.Schema

const slotSchema = new Schema({
  slot_time: String,
  slot_date: String,
  created_at: Date,
})
const appointmentSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  selectedSlot: String,
  selectedDate: String,
  person: String,
  require: String,
  created_at: {
    default: new Date(),
    type: Date,
  },
  status: {
    default: false,
    type: Boolean,
  },
})

export const shopinfoSchema = new Schema({
  company: String,
  email: String,
  password: String,
  phoneNumber: String,
  city: String,
  cityCode: String,
  street: String,
  firstName: String,
  lastName: String,
  uid: String,
  shopname: String,
})

export const tokenSchema = new Schema({
  token: String,
  expiry: String,
})
const requestSchema = new Schema({
  email: String,
  phone: String,
})

export const Token = mongoose.model("Token", tokenSchema)
export const Slot = mongoose.model("Slot", slotSchema)
export const Appointment = mongoose.model("Appointment", appointmentSchema)
export const ShopInfo = mongoose.model("Shopinfo", shopinfoSchema)
export const RequestInfo = mongoose.model("RequestInfo", requestSchema)

// export {
//   Token,
//   Appointment,
//   Slot,
//   ShopInfo,
//   RequestInfo,
//   appointmentSchema,
//   tokenSchema,
//   shopinfoSchema,
// }

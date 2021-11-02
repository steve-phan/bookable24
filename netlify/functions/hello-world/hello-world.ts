require("dotenv").config()
import { Handler } from "@netlify/functions"
import mongoose, { Document } from "mongoose"

import { appointmentSchema } from "../utils/models/bookingModel"
import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async (event, context) => {
  try {
    const shopNameConn = await connect()
    const bookingConn = shopNameConn.connection.useDb("shop-test1234561")
    const Appointment = bookingConn.model("Appointment", appointmentSchema)

    const found = await Appointment.find({ xxxxx: "tsting@mgia.com" })
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: found,
      }),
    }
  } catch (error) {
    console.log("Not found", error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Not found  !`,
      }),
    }
  }
}

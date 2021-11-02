import { Handler } from "@netlify/functions"
import { google } from "googleapis"

import { connect } from "../utils/mongooseConnect"
import { appointmentSchema } from "../utils/models/bookingModel"
import { getValidToken } from "../utils/googleToken"
import configTransporter from "./transporter"

export const handler: Handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const { bookingId, shopName, shopInfo } = JSON.parse(event.body)

      const shopNamesDB = await connect()
      const bookingConn = shopNamesDB.connection.useDb(shopName)
      const Appointment = bookingConn.model("Appointment", appointmentSchema)
      const appointmentFound = await Appointment.findById(bookingId)

      return {
        statusCode: 200,
        body: JSON.stringify(appointmentFound),
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      }
    }
  } else if (event.httpMethod === "GET") {
    const { bookingid: bookingId, shopname: shopName, shopinfo } = event.headers
    const shopInfo = JSON.parse(shopinfo)
    const shopNamesDB = await connect()
    const bookingConn = shopNamesDB.connection.useDb(shopName)
    const Appointment = bookingConn.model("Appointment", appointmentSchema)
    const appointmentFound: any = await Appointment.findOneAndUpdate(
      { _id: bookingId },
      { status: true }
    )
    const { email, last_name, first_name } = appointmentFound
    const validToken = await getValidToken()
    const { transporter, mailOptions } = configTransporter({
      token: validToken,
      email,
      lastName: last_name,
      firstName: first_name,
      shopInfo,
    })
    transporter.sendMail(mailOptions, () => {})

    return {
      statusCode: 200,
      body: JSON.stringify("DELETED"),
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify("You Are Not Allowed"),
    }
  }
}

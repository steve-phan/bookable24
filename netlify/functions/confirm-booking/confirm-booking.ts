require("dotenv").config()
import { Handler } from "@netlify/functions"
import { google } from "googleapis"
import dayjs from "dayjs"

import { connect } from "../utils/mongooseConnect"
import { appointmentSchema } from "../utils/models/bookingModel"
import configTransporter from "./transporter"
import { getValidToken } from "../utils/googleToken"

export const handler: Handler = async function (event) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: " NOT allowed" }),
    }
  }
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })
  const appointment = JSON.parse(event.body)
  const {
    userinfo: { firstName, lastName, email, phone },
    selectedDate,
    selectedSlot,
    person,
    require,
    shopinfo,
  } = appointment
  const shopName = shopinfo.shopName || shopinfo.shopname // Change shopname to shopName
  const formatDate = dayjs(
    selectedDate,
    selectedDate.length === 10 ? "DD-MM-YYYY" : "YYYY MM DD"
  ).format("MMM DD")
  try {
    const shopnamesDb = await connect()
    const bookingConn = shopnamesDb.connection.useDb(shopName)
    const Appointment = bookingConn.model("Appointment", appointmentSchema)
    const newappointment = new Appointment({
      first_name: firstName,
      last_name: lastName,
      selectedSlot,
      selectedDate: formatDate,
      email,
      phone,
      person,
      require,
    })

    await newappointment.save()
    const validToken = await getValidToken()
    const { transporter, mailOptions } = configTransporter({
      shopName,
      token: validToken,
      email,
      person,
      phone,
      lastName,
      firstName,
      selectedSlot,
      selectedDate: formatDate,
      require,
      shopinfo,
      terminId: newappointment._id,
    })

    transporter.sendMail(mailOptions, () => {})
    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

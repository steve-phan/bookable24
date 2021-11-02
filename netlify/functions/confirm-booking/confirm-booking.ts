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

  const appointment = JSON.parse(event.body)
  const {
    userinfo: { firstName, lastName, email, phone },
    selectedDate,
    selectedSlot,
    person,
    require,
    shopInfo,
  } = appointment
  const shopName = shopInfo.shopName
  const formatDate = dayjs(
    selectedDate,
    selectedDate.length === 10 ? "DD-MM-YYYY" : "YYYY MM DD"
  ).format("MMM DD YYYY")
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
      shopInfo,
      terminId: newappointment._id,
    })

    transporter.sendMail(mailOptions, (err, doc) => {
      if (err) {
        console.log("sendmail err", err)
      } else {
        console.log("sendmail success", doc)
      }
    })
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

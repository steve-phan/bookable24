require("dotenv").config()
import { Handler } from "@netlify/functions"
import { Document } from "mongoose"
import { google } from "googleapis"

import { connect } from "../utils/mongooseConnect"

import { appointmentSchema } from "../utils/models/bookingModel"
import { tokenSchema } from "../utils/models/tokenModel"
import configTransporter from "./transporter"
import { getValidToken } from "../utils/googleToken"
import moment from "moment"

interface IToken {
  _id?: unknown
  expiry?: string
  token?: string
}
type TTokenData = Document<any, any, unknown> & IToken

export const handler: Handler = async function (event, context) {
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
  console.log("shopinfo  ==>", shopinfo)
  const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/${shopName}?retryWrites=true&w=majority`
  const formatDate = moment(
    selectedDate,
    selectedDate.length === 10 ? "DD-MM-YYYY" : "YYYY MM DD"
  ).format("MMM DD")
  try {
    const shopnamesDb = await connect()

    const bookingConn = await shopnamesDb.connection.useDb(shopName)
    const newappointment = await bookingConn.model(
      "Appointment",
      appointmentSchema
    )({
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
    let validToken = await getValidToken()
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

    // tokenDB.close()
    // mongoose.connection.close()
    await transporter.sendMail(mailOptions, () => {})
    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    // mongoose.connection.close()
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

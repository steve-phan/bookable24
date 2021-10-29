import { Handler } from "@netlify/functions"
import mongoose, { Document } from "mongoose"
import { google } from "googleapis"

import { Appointment } from "../utils/models/bookingModel"
import { tokenSchema } from "../utils/models/tokenModel"

import configTransporter from "./transporter"

interface IToken {
  _id?: unknown
  expiry?: string
  token?: string
}
type TTokenData = Document<any, any, unknown> & IToken

export const handler: Handler = async (event, context) => {
  try {
    const { bookingId, shopName, shopInfo } = JSON.parse(event.body)

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )
    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    })

    const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/${shopName}?retryWrites=true&w=majority`

    await mongoose.connect(url)

    let validToken = null
    const tokenDB = mongoose.connection.useDb("token")
    const tokenData: TTokenData[] = await tokenDB
      .model("token", tokenSchema)
      .find({})

    if (Number(tokenData[0].expiry) - Date.now() < 3 * 60 * 1000) {
      const {
        token,
        res: {
          data: { expiry_date },
        },
      } = await oAuth2Client.getAccessToken()
      validToken = token
      await tokenDB.model("token", tokenSchema).findOneAndUpdate(
        {
          token: tokenData[0].token,
        },
        {
          token: token,
          expiry: expiry_date,
        },
        () => {
          // console.log('UPDATED .......');
        }
      )
    } else {
      validToken = tokenData[0].token
    }

    console.log("event, =====>", event)

    const appointmentFound = await Appointment.findById(bookingId)
    const {
      email,
      person,
      phone,
      last_name,
      first_name,
      selectedSlot,
      selectedDate,
      require,
    } = appointmentFound

    const { transporter, mailOptions } = configTransporter({
      shopName,
      token: validToken,
      email,
      person,
      phone,
      lastName: last_name,
      firstName: first_name,
      selectedSlot,
      selectedDate,
      require,
      shopInfo,
    })

    tokenDB.close()
    mongoose.connection.close()
    await transporter.sendMail(mailOptions, () => {})
    return {
      statusCode: 200,
      body: JSON.stringify(appointmentFound),
    }
  } catch (error) {
    mongoose.connection.close()
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

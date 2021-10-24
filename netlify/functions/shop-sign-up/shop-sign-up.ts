import { Handler } from "@netlify/functions"
require("dotenv").config()
import mongoose from "mongoose"
// const { ShopInfo } = require('./schema');
import { ShopInfo } from "../utils/config"
import { google } from "googleapis"
const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/shopnames?retryWrites=true&w=majority`

import configTransporter from "./transporter"

export const handler: Handler = async (event, context) => {
  const data = JSON.parse(event.body)
  // console.log(data);
  const {
    company,
    email,
    password,
    phoneNumber,
    city,
    cityCode,
    street,
    firstName,
    lastName,
    uid,
  } = data.userinfo
  let shopname = company
    .toLowerCase()
    .split(" ")
    .filter(str => !!str)
    .join("-")

  shopname = shopname + cityCode + Math.floor(Math.random() * 100)

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })
  try {
    const { token } = await oAuth2Client.getAccessToken()
    const { transporter, mailOptions } = configTransporter({
      shopname,
      company,
      email,
      phoneNumber,
      city,
      cityCode,
      street,
      firstName,
      lastName,
      uid,
      token,
    })

    await mongoose.connect(url)

    const newShop = new ShopInfo({
      company,
      email,
      phoneNumber,
      city,
      cityCode,
      street,
      firstName,
      lastName,
      uid,
      shopname,
    })
    // const newShop = new ShopInfo({
    //   email: 'hehe@ads.com',
    // });
    await newShop.save((err, data) => {
      if (!err) {
        console.log("SAVE SUCCESSFULLY")
      } else {
      }
      mongoose.connection.close()
    })

    await transporter.sendMail(mailOptions, (error, info) => {
      // oAuth2Client.off();
      if (error) {
        console.log("error ===>", error)
      } else {
        mongoose.connection.close()
        console.log("success ===>")
      }
    })

    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    mongoose.connection.close()

    console.log("ERROR ===========>", error)
    return { statusCode: 500, body: error.toString() }
  }
}

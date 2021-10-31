require("dotenv").config()
import { Handler } from "@netlify/functions"
import { google } from "googleapis"
import mongoose from "mongoose"
// const { ShopInfo } = require('./schema');
import { shopinfoSchema } from "../utils/config"
import { connect } from "../utils/mongooseConnect"
import { getValidToken } from "../utils/googleToken"

const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/shopnames?retryWrites=true&w=majority`

import configTransporter from "./transporter"

export const handler: Handler = async event => {
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
    const shopNamesDb = await connect()
    const ShopInfo = shopNamesDb.model("Shopinfo", shopinfoSchema)
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
    const validToken = await getValidToken()
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
      token: validToken,
    })

    await newShop.save(() => {})
    transporter.sendMail(mailOptions, () => {})

    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

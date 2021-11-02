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
    phoneNumber,
    city,
    cityCode,
    street,
    firstName,
    lastName,
    uid,
  } = data.userinfo
  let shopName = company
    .toLowerCase()
    .split(" ")
    .filter(str => !!str)
    .join("-")

  shopName = shopName + cityCode + Math.floor(Math.random() * 100)
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
      shopName,
    })
    const validToken = await getValidToken()
    const { transporter, mailOptions } = configTransporter({
      shopName,
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

    await newShop.save()
    transporter.sendMail(mailOptions, () => {})

    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

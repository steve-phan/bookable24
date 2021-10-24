import { Handler } from "@netlify/functions"
import mongoose from "mongoose"
require("dotenv").config()
// const { hello } = require('utils');
import { Appointment, shopinfoSchema } from "../utils/config"

export const handler: Handler = async (event, context) => {
  const { shopname, shopemail } = event.headers
  const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/${shopname}?retryWrites=true&w=majority`

  try {
    await mongoose.connect(url)
    const shopDb = mongoose.connection.useDb("shopnames")
    console.log("shopname", shopDb)
    const shopInfo = await shopDb.model("shopinfo", shopinfoSchema).findOne({
      email: shopemail,
    })

    let allTermins = await Appointment.find({})
    mongoose.connection.close()
    return {
      statusCode: 200,
      body: JSON.stringify({ allTermins, shopInfo }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    mongoose.connection.close()
    return { statusCode: 500, body: error.toString() }
  }
}

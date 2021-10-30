import { Handler } from "@netlify/functions"
import mongoose from "mongoose"
require("dotenv").config()

import { appointmentSchema, Appointment } from "../utils/models/bookingModel"
import { shopinfoSchema } from "../utils/models/shopInfoModel"
import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async (event, context) => {
  const { shopname, shopemail } = event.headers
  // const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/${shopname}?retryWrites=true&w=majority`
  console.log("shopname===>", shopname)
  try {
    const shopTerminsDb = await connect(shopname)

    const allTermins = await shopTerminsDb
      .model("Appointment", appointmentSchema)
      .find({})

    const shopNamesDb = await connect("shopnames")
    //  mongoose.connection.useDb("shopnames")
    const shopInfo = await shopNamesDb
      .model("Shopinfo", shopinfoSchema)
      .findOne({
        email: shopemail,
      })

    // console.log("alltermin", allTermins)
    // mongoose.connection.close()
    return {
      statusCode: 200,
      body: JSON.stringify({ allTermins, shopInfo }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    console.log("get shoptermin errors", error)
    // mongoose.connection.close()
    return { statusCode: 500, body: error.toString() }
  }
}

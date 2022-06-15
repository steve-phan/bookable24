import { Handler } from "@netlify/functions"
import dayjs from "dayjs"
require("dotenv").config()

import { appointmentSchema } from "../utils/models/bookingModel"
import { ShopInfo } from "../utils/models/shopInfoModel"
import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async event => {
  const { shopid, shopemail } = event.headers

  try {
    /**
     * @useCase : to access to multiple databases
     *
     */
    const shopNamesDb = await connect()

    // This is the global connection, so we can use Model directly
    const shopInfo = await ShopInfo.findOne({
      email: shopemail.toLowerCase(),
    })
    // Next we use useDb method to connect to another database
    const shopTerminsDb = shopNamesDb.connection.useDb(shopid)
    // Define a Model here base on the Schema
    const Appointment = shopTerminsDb.model("Appointment", appointmentSchema)
    // Access to Model method
    // const today = dayjs(new Date()).format("YYYY-MM-DD") as Date
    const allTermins = await Appointment.find({
      selectedDate: { $gte: "2022-06-01" },
    })
    // {createdAt:{$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}}
    return {
      statusCode: 200,
      body: JSON.stringify({ allTermins, shopInfo }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

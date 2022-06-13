import { Handler } from "@netlify/functions"
require("dotenv").config()

import { appointmentSchema } from "../utils/models/bookingModel"
import { ShopInfo } from "../utils/models/shopInfoModel"
import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async event => {
  const { shopId } = JSON.parse(event.body)
  console.log({ shopId })
  try {
    const shopNamesDb = await connect()

    const shopTerminsDb = shopNamesDb.connection.useDb(shopId)

    const Appointment = shopTerminsDb.model("Appointment", appointmentSchema)

    await Appointment.find({}).then(x => {
      x.forEach(item => {
        console.log("just query")
        Appointment.findOneAndUpdate(
          { _id: item._id },
          //@ts-ignore
          { selectedDate: new Date(item.selectedDate).toISOString() },
          e => {
            // console.log("hahaha", new Date(item.selectedDate).toISOString())
            // console.log("hahaha", "item.selectedDate.toISOString()")
          }
        )
      })
    })
    // {createdAt:{$gte:ISODate("2021-01-01"),$lt:ISODate("2020-05-01"}}

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "Update Successfull" }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

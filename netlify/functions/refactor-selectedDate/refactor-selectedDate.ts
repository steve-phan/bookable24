// @ts-nocheck

import { Handler } from "@netlify/functions"
require("dotenv").config()
import dayjs from "dayjs"
import { appointmentSchema } from "../utils/models/bookingModel"
import { ShopInfo } from "../utils/models/shopInfoModel"
import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async event => {
  const { shopId } = JSON.parse(event.body)
  try {
    const shopNamesDb = await connect()

    const shopTerminsDb = shopNamesDb.connection.useDb(shopId)
    console.log({ shopId })
    const Appointment = shopTerminsDb.model("Appointment", appointmentSchema)
    /**
     * @method : $rename first_name =>  firstName, last_name => lastName
     */
    await Appointment.updateMany(
      {},
      {
        $rename: { first_name: "firstName", last_name: "lastName" },
      }
    )
    /**
     * @method : modifed value of a specific key
     */

    // await Appointment.find({}).then(x => {
    //   x.forEach(async item => {
    //     const newDate = dayjs(item?.selectedDate).isValid()
    //       ? new Date(item?.selectedDate).toISOString()
    //       : "2021-01-01T15:56:59.211+00:00"
    //     await Appointment.findOneAndUpdate(
    //       { _id: item._id },
    //       {
    //         selectedDate: newDate,
    //       }
    //     )
    //     await Appointment.updateOne()
    //   })
    // })

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "Update Successfull" }),
    }
  } catch (error) {
    console.log({ error })
    return { statusCode: 500, body: error.toString() }
  }
}

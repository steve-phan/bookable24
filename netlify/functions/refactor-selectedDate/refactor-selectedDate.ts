// @ts-nocheck

import { Handler } from "@netlify/functions"
require("dotenv").config()
import dayjs from "dayjs"
import { appointmentSchema } from "../utils/models/bookingModel"
import { ShopInfo } from "../utils/models/shopInfoModel"
import { connect } from "../utils/mongooseConnect"
import { shopinfoSchema } from "../utils/models/shopInfoModel"

export const handler: Handler = async event => {
  const { shopId, shopEmail } = JSON.parse(event.body)
  try {
    const shopNamesDb = await connect()

    const shopNameConnection = shopNamesDb.connection.useDb("shopnames")

    const ShopInfo = shopNameConnection.model("ShopInfo", shopinfoSchema)
    const shopEmail2 = shopEmail.toLowerCase()
    console.log({ shopEmail2 })
    const shopInfoFound = await ShopInfo.findOne({
      email: shopEmail2,
    })
    console.log({ shopInfoFound })

    const shopTerminsDb = shopNamesDb.connection.useDb(shopId)

    const ShopInfo2 = shopTerminsDb.model("ShopInfo", shopinfoSchema)
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
      shopName,
      // settings: {
      //   weekdays = [],
      //   time = "",
      //   closedRegularDay = "",
      //   slotTime = "",
      //   terminBefore = null,
      //   maxTerminPerSlot = "",
      //   closedSpecificDay = [],
      // },
    } = shopInfoFound
    const newShopInfo = new ShopInfo2({
      company,
      email,
      phoneNumber,
      city,
      cityCode,
      street,
      firstName,
      lastName,
      uid,
      shopId: shopName,
      // settings: {
      //   weekdays,
      //   time,
      //   closedRegularDay,
      //   slotTime,
      //   terminBefore,
      //   maxTerminPerSlot,
      //   closedSpecificDay,
      // },
    })
    await newShopInfo.save()
    // const Appointment = shopTerminsDb.model("Appointment", appointmentSchema)
    /**
     * @method : $rename first_name =>  firstName, last_name => lastName
     */
    // await Appointment.updateMany(
    //   {},
    //   {
    //     $rename: { first_name: "firstName", last_name: "lastName" },
    //   }
    // )
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

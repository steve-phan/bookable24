import { Handler } from "@netlify/functions"
import dayjs from "dayjs"
require("dotenv").config()

import { appointmentSchema } from "../utils/models/bookingModel"
import { shopinfoSchema } from "../utils/models/shopInfoModel"
import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async event => {
  const { shopId, shopEmail } = JSON.parse(event.body as string) as {
    shopId: string
    shopEmail: string
  }
  try {
    const defaultDb = await connect()
    /**
     * @ShopInfo : This step is needed to make sure we're using the righ
     * connection  to get infomation of the shop.
     *
     * @Appointment : Onemore time switch to collections of shopId to get
     * all appointments.
     *
     * @useDB : TO use useDb method we need call model directly here.
     *
     * @TODO : Move shopnames to shopId collection?
     */

    const shopDb = defaultDb.connection.useDb(shopId)
    const ShopInfo = shopDb.model("ShopInfo", shopinfoSchema)
    const shopInfo = await ShopInfo.findOne({
      email: shopEmail.toLowerCase(),
    })

    const Appointment = shopDb.model("Appointment", appointmentSchema)

    let today = new Date()
    today.setDate(today.getDate() - 1)
    const yesterday = dayjs(today).format("YYYY-MM-DD") as unknown as Date

    const allTermins = await Appointment.find({
      selectedDate: { $gte: yesterday },
    })
    const mappedTermins = allTermins.map(termin => {
      const { selectedDate, selectedSlot } = termin as unknown as {
        selectedDate: string
        selectedSlot: string
      }
      return {
        selectedDate,
        selectedSlot,
      }
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ allTermins: mappedTermins, shopInfo }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

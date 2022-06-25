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
    /**
     * @useCase : to access to multiple databases
     *
     */
    const shopNamesDb = await connect()
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

    const shopInfoDb = shopNamesDb.connection.useDb("shopnames")
    const ShopInfo = shopInfoDb.model("ShopInfo", shopinfoSchema)
    const shopInfo = await ShopInfo.findOne({
      email: shopEmail.toLowerCase(),
    })
    // Next we use useDb method to connect to another database
    const shopTerminsDb = shopNamesDb.connection.useDb(shopId)
    // Define a Model here base on the Schema
    const Appointment = shopTerminsDb.model("Appointment", appointmentSchema)
    // Access to Model method
    let today = new Date()
    today.setDate(today.getDate() - 1)
    const yesterday = dayjs(today).format("YYYY-MM-DD") as unknown as Date

    const allTermins = await Appointment.find({
      selectedDate: { $gte: yesterday },
    })
    return {
      statusCode: 200,
      body: JSON.stringify({ allTermins, shopInfo }),
    }
  } catch (error) {
    console.log({ error })
    return { statusCode: 500, body: error.toString() }
  }
}

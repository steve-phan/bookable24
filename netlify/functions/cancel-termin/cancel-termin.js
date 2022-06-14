const { connect } = require("../utils/mongooseConnect")
const { appointmentSchema } = require("../utils/models/bookingModel")
const { shopinfoSchema } = require("../utils/models/shopInfoModel")
const configTransporter = require("./transporter")
const { getValidToken } = require("../utils/googleToken")

const handler = async event => {
  if (event.httpMethod === "POST") {
    try {
      const { bookingId, shopId } = JSON.parse(event.body)
      const shopNamesDB = await connect()
      const ShopInfoModel = shopNamesDB.model("ShopInfo", shopinfoSchema)
      const shopInfo = await ShopInfoModel.find({ shopName: shopId })

      const bookingConn = shopNamesDB.connection.useDb(shopId)
      const Appointment = bookingConn.model("Appointment", appointmentSchema)

      const appointmentFound = await Appointment.findById(bookingId)
      return {
        statusCode: 200,
        body: JSON.stringify({ appointmentFound, shopInfo: shopInfo[0] }),
      }
    } catch (error) {
      console.log({ error })
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      }
    }
  } else if (event.httpMethod === "GET") {
    const { bookingid: bookingId, shopid: shopId } = event.headers
    const shopNamesDB = await connect()
    const ShopInfoModel = shopNamesDB.model("ShopInfo", shopinfoSchema)
    const shopInfo = await ShopInfoModel.find({ shopName: shopId })

    const bookingConn = shopNamesDB.connection.useDb(shopId)
    const Appointment = bookingConn.model("Appointment", appointmentSchema)
    const appointmentFound = await Appointment.findOneAndUpdate(
      { _id: bookingId },
      { status: true }
    )
    const {
      email,
      last_name,
      first_name,
      selectedSlot,
      selectedDate,
      phone,
      person,
      require,
    } = appointmentFound
    const validToken = await getValidToken()

    const { transporter, mailOptions } = configTransporter({
      token: validToken,
      email,
      lastName: last_name,
      firstName: first_name,
      shopInfo: shopInfo[0],
      selectedSlot,
      selectedDate,
      phone,
      person,
      require,
    })
    await transporter.sendMail(mailOptions)

    return {
      statusCode: 200,
      body: JSON.stringify("DELETED"),
    }
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify("You Are Not Allowed"),
    }
  }
}

module.exports = { handler }

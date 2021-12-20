const { connect } = require("../utils/mongooseConnect")
const { appointmentSchema } = require("../utils/models/bookingModel")
const configTransporter = require("./transporter")
const { getValidToken } = require("../utils/googleToken")

const handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const { bookingId, shopId, shopInfo } = JSON.parse(event.body)

      const shopNamesDB = await connect()
      const bookingConn = shopNamesDB.connection.useDb(shopId)
      const Appointment = bookingConn.model("Appointment", appointmentSchema)

      const appointmentFound = await Appointment.findById(bookingId)
      return {
        statusCode: 200,
        body: JSON.stringify(appointmentFound),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      }
    }
  } else if (event.httpMethod === "GET") {
    const { bookingid: bookingId, shopid, shopinfo } = event.headers
    const shopInfo = JSON.parse(shopinfo)
    const shopNamesDB = await connect()
    const bookingConn = shopNamesDB.connection.useDb(shopid)
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
      shopInfo,
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

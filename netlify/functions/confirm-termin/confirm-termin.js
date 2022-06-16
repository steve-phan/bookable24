const dayjs = require("dayjs")

require("dotenv").config()

const { connect } = require("../utils/mongooseConnect")
const { appointmentSchema } = require("../utils/models/bookingModel")
const configTransporter = require("./transporter")
const { getValidToken } = require("../utils/googleToken")

const handler = async event => {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: " NOT allowed" }),
    }
  }

  const appointment = JSON.parse(event.body)
  const {
    firstName,
    lastName,
    email,
    phone,
    selectedDate,
    selectedSlot,
    person,
    require,
    shopId,
    shopInfo,
  } = appointment

  try {
    const shopnamesDb = await connect()

    const bookingConn = shopnamesDb.connection.useDb(shopId)

    const Appointment = bookingConn.model("Appointment", appointmentSchema)

    const newappointment = new Appointment({
      firstName,
      lastName,
      selectedSlot,
      selectedDate,
      email,
      phone,
      person,
      require,
    })

    await newappointment.save()
    const validToken = await getValidToken()
    const { transporter, mailOptions } = configTransporter({
      token: validToken,
      email,
      person,
      phone,
      lastName,
      firstName,
      selectedSlot,
      selectedDate: dayjs(selectedDate).format("MMM-DD-YYYY"),
      require,
      shopId,
      shopInfo,
      bookingId: newappointment._id,
    })

    await transporter.sendMail(mailOptions)
    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    console.log({ error })
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }

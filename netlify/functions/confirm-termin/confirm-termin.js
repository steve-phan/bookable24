require("dotenv").config()

const { connect } = require("../utils/mongooseConnect")
const { appointmentSchema } = require("../utils/models/bookingModel")
const { customerSchema } = require("../utils/models/customerModel")
const configTransporter = require("./transporter")
const { getValidToken } = require("../utils/googleToken")

const handler = async function (event) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: " NOT allowed" }),
    }
  }

  const appointment = JSON.parse(event.body)
  const {
    userinfo: { firstName, lastName, email, phone },
    selectedDate,
    selectedSlot,
    person,
    require,
    shopInfo,
  } = appointment
  const shopName = Boolean(shopInfo.shopName)
    ? shopInfo.shopName
    : shopInfo.shopname
  try {
    const shopnamesDb = await connect()

    const bookingConn = shopnamesDb.connection.useDb(shopName)

    const Appointment = bookingConn.model("Appointment", appointmentSchema)
    const Customer = bookingConn.model("Customer", customerSchema)
    const searchEmailRegex = new RegExp(email, "i")
    const searchPhoneRegex = new RegExp(String(phone), "i")
    const customerFounddByPhone = await Customer.find({
      phone: searchPhoneRegex,
    })
    const customerFounddByEmail = await Customer.find({
      email: searchEmailRegex,
    })

    const isCustomer =
      customerFounddByPhone.length !== 0 || customerFounddByEmail.length !== 0
    if (!isCustomer) {
      console.log("creating new customer")
      const newCustomer = new Customer({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
      })
      await newCustomer.save()
    }

    const newappointment = new Appointment({
      first_name: firstName,
      last_name: lastName,
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
      shopName,
      token: validToken,
      email,
      person,
      phone,
      lastName,
      firstName,
      selectedSlot,
      selectedDate,
      require,
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

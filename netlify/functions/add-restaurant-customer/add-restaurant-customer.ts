require("dotenv").config()
const dayjs = require("dayjs")

const { connect } = require("../utils/mongooseConnect")
const { customerSchema } = require("../utils/models/customerModel")

const handler = async function (event) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: " NOT allowed" }),
    }
  }

  const { firstName, lastName, email, phone, shopId } = JSON.parse(event.body)

  try {
    const shopnamesDb = await connect()

    const bookingConn = shopnamesDb.connection.useDb(shopId)

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

    return {
      statusCode: 200,
      body: "SUCCESS",
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

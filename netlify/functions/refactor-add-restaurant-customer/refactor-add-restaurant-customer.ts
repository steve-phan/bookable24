// @ts-nocheck

import { Handler } from "@netlify/functions"
require("dotenv").config()

import { appointmentSchema } from "../utils/models/bookingModel"
const { customerSchema } = require("../utils/models/customerModel")

import { connect } from "../utils/mongooseConnect"

export const handler: Handler = async event => {
  const { shopId } = JSON.parse(event.body)
  try {
    const shopNamesDb = await connect()

    const bookingConn = shopNamesDb.connection.useDb(shopId)

    const Customer = bookingConn.model("Customer", customerSchema)
    const Appointment = bookingConn.model("Appointment", appointmentSchema)

    await Appointment.find({}).then(x => {
      let emailArr = []
      let phoneArr = []
      x.reduce((acc, cur) => {
        const { email, phone } = cur as any

        if (emailArr.includes(email) || phoneArr.includes(phone)) {
          return [...acc]
        }
        emailArr.push(email)
        phoneArr.push(phone)
        return [cur, ...acc]
      }, []).forEach(async item => {
        const {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
        } = item

        const newCustomer = new Customer({
          firstName,
          lastName,
          email,
          phone,
        })
        await newCustomer.save()
      })
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ status: "Update Successfull" }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

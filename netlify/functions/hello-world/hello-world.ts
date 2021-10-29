import { Handler } from "@netlify/functions"
import mongoose, { Document } from "mongoose"
import { number, string } from "prop-types"

import { Appointment } from "../utils/models/bookingModel"

export const handler: Handler = async (event, context) => {
  const { name = "stranger" } = event.queryStringParameters

  const newBooking = {
    first_name: "xxx",
    last_name: "lastName",
    selectedSlot: "xxx",
    selectedDate: "xxx",
    email: "xx",
    phone: "xx",
    person: "xx",
    require: "xxxxx",
  }

  try {
    const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/helloworld?retryWrites=true&w=majority`
    await mongoose.connect(url)
    const newApport = new Appointment({ ...newBooking })
    console.log(newApport)
    await newApport.save((err, save) => {
      if (err) {
        console.log("mongoSave err", err)
      } else {
        console.log("mongoSave success", save)
      }
    })

    console.log("mongoo pass")
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello,  success ${name}!`,
      }),
    }
  } catch (error) {
    console.log("mongooerror")
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Hello, error ${name}!`,
      }),
    }
  }
}

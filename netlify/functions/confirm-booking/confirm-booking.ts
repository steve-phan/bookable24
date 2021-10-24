require("dotenv").config()
import { Handler } from "@netlify/functions"

// const nodemailer = require('nodemailer')
// const path = require("path")
// const hbs = require("nodemailer-express-handlebars")
import mongoose, { Document } from "mongoose"
import { google } from "googleapis"
// const { Appointment, Slot } = require('./models/schema');
import { Token, Appointment, Slot, tokenSchema } from "../utils/config"

// const createMailTemplate = require('./modules/create-mail-template');
import { timeSlots } from "../utils/models/timeslot"
import configTransporter from "./transporter"
import moment from "moment"

export const handler: Handler = async function (event, context) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: " NOT allowed" }),
    }
  }
  const pathRequest = event.headers.referer.split("/")
  const shopname = pathRequest[pathRequest.length - 1]

  // const user = process.env.MAIL_USER;
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
  oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })

  const appointment = JSON.parse(event.body)
  const {
    userinfo: { firstName, lastName, email, phone },
    selectedDate,
    selectedSlot,
    person,
    require,
    shopinfo,
  } = appointment

  try {
    const url = `mongodb+srv://teddy:${process.env.MONGO_PASSWORD}@cluster0.nanpu.mongodb.net/${shopname}?retryWrites=true&w=majority`
    await mongoose.connect(url)

    interface IToken {
      _id?: unknown
      expiry?: string
      token?: string
    }
    type TTokenData = Document<any, any, unknown> & IToken

    let validToken = null
    const tokenDB = mongoose.connection.useDb("token")
    const tokenData: TTokenData[] = await tokenDB
      .model("token", tokenSchema)
      .find({})

    if (Number(tokenData[0].expiry) - Date.now() < 3 * 60 * 1000) {
      // console.log("tokenData ==>>", 1)
      const {
        token,
        res: {
          data: { expiry_date },
        },
      } = await oAuth2Client.getAccessToken()
      validToken = token
      await tokenDB.model("token", tokenSchema).findOneAndUpdate(
        {
          token: tokenData[0].token,
        },
        {
          token: token,
          expiry: expiry_date,
        },
        () => {
          // console.log('UPDATED .......');
        }
      )
    } else {
      // console.log('GREATER');

      validToken = tokenData[0].token
    }
    console.log("tokenData ==>>", tokenData)
    const newslot = new Slot({
      slot_time: timeSlots[selectedSlot],
      slot_date: selectedDate,
      created_at: Date.now(),
    })
    const formatDate = moment(
      selectedDate,
      selectedDate.length === 10 ? "DD-MM-YYYY" : "YYYY MM DD"
    ).format("MMM DD")
    const { transporter, mailOptions } = configTransporter({
      shopname,
      token: validToken,
      email,
      person,
      phone,
      lastName,
      firstName,
      selectedSlot,
      selectedDate: formatDate,
      require,
      shopinfo,
      terminId: newslot._id,
    })

    await newslot.save((err, saved) => {
      Slot.find({ _id: saved._id })
        .populate("slots")
        .exec((err, slot) => {
          if (slot) {
            const newappointment = new Appointment({
              first_name: firstName,
              last_name: lastName,
              selectedSlot,
              selectedDate: formatDate,
              email,
              phone,
              person,
              require,
              slots: newslot._id,
            })
            // console.log(newappointment);
            newappointment.save((err, saved) => {
              Appointment.find({ _id: saved._id })
                .populate("appointments")
                .exec((err, appointment) => {
                  mongoose.connection.close()
                  // console.log(mongoose.connection.readyState);
                })
            })
          }
        })
    })
    // console.log("MONGDO DB CONNECT", transporter)
    await transporter.sendMail(mailOptions, (error, info) => {
      // oAuth2Client.off();
      if (error) {
        console.log("error ===>", error)
      } else {
        mongoose.connection.close()
        console.log("success ===>")
      }
    })
    return {
      statusCode: 200,
      body: "EMAIL_SENT",
    }
  } catch (error) {
    mongoose.connection.close()
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

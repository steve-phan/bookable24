require("dotenv").config()
// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
const user = process.env.MAIL_USER
const baseUrl = process.env.BASE_URL || "https://bookable24.de"

const configTransporter = ({
  shopName,
  company,
  email,
  phoneNumber,
  city,
  cityCode,
  street,
  firstName,
  lastName,
  uid,
  token,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      accessToken: token,
    },
  })
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.resolve(
          __dirname,
          "../../../../../../../netlify/functions/utils/booking/views"
        ),
        layoutsDir: path.resolve(
          __dirname,
          "../../../../../../../netlify/functions/utils/booking/views/layouts"
        ),
      },
      viewPath: path.resolve(
        __dirname,
        "../../../../../../../netlify/functions/utils/booking/views"
      ),
      extName: ".hbs",
    })
  )

  let mailOptions = {
    from: "BookAble24 <vietappeu@gmail.com>",
    to: [email, "lebenistcode@gmail.com", "bookable24.de@gmail.com"],
    subject: "Your Shop Booking System Request",
    template: "account",
    context: {
      shopName,
      company,
      email,
      phoneNumber,
      city,
      cityCode,
      street,
      firstName,
      lastName,
      uid,
      link_shop: `${baseUrl}/${shopName}`,
    },
  }
  return {
    transporter,
    mailOptions,
  }
}

export default configTransporter

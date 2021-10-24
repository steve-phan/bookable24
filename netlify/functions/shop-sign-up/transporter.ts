require("dotenv").config()
// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
const user = process.env.MAIL_USER
const baseUrl = process.env.BASE_URL || "http://localhost:8888"

const configTransporter = ({
  shopname,
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
        partialsDir: path.resolve("./netlify/functions/utils/signup/views"),
        // path.join(__dirname, "utils", "views"),
        layoutsDir: path.resolve(
          "./netlify/functions/utils/signup/views/layouts"
        ),
        // path.join(__dirname, "utils", "views", "layouts"),
      },
      viewPath: path.resolve("./netlify/functions/utils/signup/views"),
      extName: ".hbs",
    })
  )

  let mailOptions = {
    from: "BookAble24 <vietappeu@gmail.com>",
    to: [email, "lebenistcode@gmail.com"],
    subject: "Your shop appointment link",
    template: "account",
    context: {
      shopname,
      company,
      email,
      phoneNumber,
      city,
      cityCode,
      street,
      firstName,
      lastName,
      uid,
      link_shop: `${baseUrl}/${shopname}`,
    },
  }
  return {
    transporter,
    mailOptions,
  }
}

export default configTransporter

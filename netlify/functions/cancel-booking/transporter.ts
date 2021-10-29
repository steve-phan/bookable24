require("dotenv").config()
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
import { timeSlots } from "../utils/models/timeslot"
const user = process.env.MAIL_USER
const baseUrl = process.env.BASE_URL || "https://bookable24.de"

const configTransporter = ({
  shopName,
  token,
  email,
  phone,
  person,
  lastName,
  firstName,
  selectedSlot,
  selectedDate,
  require,
  shopInfo,
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "lebenistcode@gmail.com",
      accessToken: token,
    },
  })
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.resolve(
          "./netlify/functions/utils/cancel-booking/views"
        ),
        layoutsDir: path.resolve(
          "./netlify/functions/utils/cancel-booking/views/layouts"
        ),
      },
      viewPath: path.resolve("./netlify/functions/utils/cancel-booking/views"),
      extName: ".hbs",
    })
  )
  const { company, street, city, cityCode } = shopInfo

  let mailOptions = {
    from: `${company}  <${shopInfo.email}>`,
    to: [email, shopInfo.email, "lebenistcode@gmail.com"],
    subject: `Cancel Booking at ${company}`,
    template: "cancel",
    context: {
      name: firstName + lastName,
      person,
      phone,
      email,
      require,
      selectedDate,
      company,
      street,
      city,
      cityCode,
      time: timeSlots[Number(selectedSlot)],
    },
  }
  return {
    transporter,
    mailOptions,
  }
}

export default configTransporter

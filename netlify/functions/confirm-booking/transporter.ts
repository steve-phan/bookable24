require("dotenv").config()
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"
import { timeSlots } from "../utils/models/timeslot"
const user = process.env.MAIL_USER
const baseUrl = process.env.BASE_URL || "https://bookable24.de"

const configTransporter = ({
  shopname,
  token,
  email,
  phone,
  person,
  lastName,
  firstName,
  selectedSlot,
  selectedDate,
  terminId,
  require,
  shopinfo,
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
        partialsDir: path.resolve("./netlify/functions/utils/booking/views"),
        // path.join(__dirname, "utils", "views"),
        layoutsDir: path.resolve(
          "./netlify/functions/utils/booking/views/layouts"
        ),
        // path.join(__dirname, "utils", "views", "layouts"),
      },
      viewPath: path.resolve("./netlify/functions/utils/booking/views"),
      // path.join(__dirname, "utils", "views"),
      extName: ".hbs",
    })
  )
  const { company, street, city, cityCode } = shopinfo

  let mailOptions = {
    from: `${company}  <${shopinfo.email}>`,
    to: [email, shopinfo.email, "lebenistcode@gmail.com"],
    subject: `Dein Termin - ${company}`,
    template: "termin",
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
      link_cancel: `${baseUrl}/${shopname}/${terminId}`,
    },
  }
  return {
    transporter,
    mailOptions,
  }
}

export default configTransporter

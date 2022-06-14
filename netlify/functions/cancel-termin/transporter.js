require("dotenv").config()
const nodemailer = require("nodemailer")
const hbs = require("nodemailer-express-handlebars")
const path = require("path")

const { timeSlots } = require("../utils/models/timeslot")

const configTransporter = ({
  token,
  email,
  lastName,
  firstName,
  shopInfo,
  selectedSlot,
  selectedDate,
  phone,
  person,
  require,
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
        partialsDir: path.join(__dirname, "views"),
        layoutsDir: path.join(__dirname, "views/layouts"),
      },
      viewPath: path.join(__dirname, "views"),

      extName: ".hbs",
    })
  )
  const { shopName, address, company } = shopInfo
  const mailOptions = {
    from: `${shopName}  <${shopInfo.email}>`,
    to: [email, shopInfo.email, "lebenistcode@gmail.com"],
    subject: `Cancel Booking at ${company}`,
    template: "cancel",
    context: {
      name: firstName + " " + lastName,
      address,
      shopName: company,
      selectedSlot,
      selectedDate,
      phone,
      person,
      require,
      email,
      time: timeSlots[Number(selectedSlot)],
    },
  }

  return {
    transporter,
    mailOptions,
  }
}

module.exports = configTransporter

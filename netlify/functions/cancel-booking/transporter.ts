require("dotenv").config()
import nodemailer from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"

const configTransporter = ({ token, email, lastName, firstName, shopInfo }) => {
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
  const { shopName, address } = shopInfo
  const mailOptions = {
    from: `${shopName}  <${shopInfo.email}>`,
    to: [email, shopInfo.email, "lebenistcode@gmail.com"],
    subject: `Cancel Booking at ${shopName}`,
    template: "cancel",
    context: {
      name: firstName + " " + lastName,
      address,
      shopName,
    },
  }

  return {
    transporter,
    mailOptions,
  }
}

export default configTransporter

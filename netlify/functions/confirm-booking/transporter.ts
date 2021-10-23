require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const { timeSlots } = require('./models/timeslot');
const user = process.env.MAIL_USER;
const baseUrl = process.env.BASE_URL || 'http://localhost:8888';

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
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'lebenistcode@gmail.com',
      accessToken: token,
    },
  });
  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.hbs',
        partialsDir: path.join(__dirname, 'views'),
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
      },
      viewPath: path.join(__dirname, 'views'),
      extName: '.hbs',
    })
  );
  const { company, street, city, cityCode } = shopinfo;

  let mailOptions = {
    from: `${company}  <${shopinfo.email}>`,
    to: [email, shopinfo.email, 'lebenistcode@gmail.com'],
    subject: `Dein Termin - ${company}`,
    template: 'termin',
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
  };
  return {
    transporter,
    mailOptions,
  };
};
module.exports = configTransporter;

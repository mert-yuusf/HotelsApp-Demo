const nodemailer = require("nodemailer");
require("dotenv").config();
const sendMail = async ({ to, subject, content }) => {
    // 1- create transporter
    const transporter = await nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })
    // 2- define email options
    const options = {
        from: "BookingAPI <hello@booking.com>",
        to: to,
        subject: subject,
        text: content
    }
    // 3- send email
    await transporter.sendMail(options)
}

module.exports = sendMail;
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')
require("dotenv").config();

// const sendMail = async ({ to, content }) => {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     const msg = {
//         to: to, // Change to your recipient
//         from: 'booking@mail.com', // Change to your verified sender
//         subject: 'Sending with SendGrid is Fun',
//         text: content,
//         // html: content,
//     }
//     sgMail
//         .send(msg)
//         .then(() => {
//             console.log('Email sent')
//         })
//         .catch((error) => {
//             console.error(error)
//         })
// }

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
const nodemailer = require('nodemailer')
require('dotenv').config()
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = process.env

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
})

const sendVerifyEmail = async ({ to, subject, html }) => {
    const mail = {
        from: `"Petly App" <${EMAIL_FROM}>`,
        to,
        subject,
        html,
    }

    await transporter.sendMail(mail)
    return true
}

module.exports = sendVerifyEmail

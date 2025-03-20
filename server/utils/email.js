import nodemailer from 'nodemailer'
import { configDotenv } from 'dotenv'

configDotenv()

export default async function sendEmail(to, subject, htmlBody) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        html: htmlBody
    }

    const mailRes = await transporter.sendMail(mailOptions)
    console.log(mailRes)
}
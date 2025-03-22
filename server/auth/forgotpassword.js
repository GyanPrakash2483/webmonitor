import User from '../models/UserSchema.js'
import sendEmail from '../utils/email.js'
import crypto from 'node:crypto'
import { configDotenv } from 'dotenv'
import dbConnect from '../utils/dbconnect.js'

configDotenv()
dbConnect()

export async function forgotPassword(req, res) {
    
    try {
        const { email } = req.body

        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        if(!email || !emailRegex.test(email)) {
            res.send({
                success: false,
                rescode: 6001,
                message: 'Invalid Email'
            })
            return
        }

        const userInDB = User.findOne({email})
        if(!userInDB) {
            res.send({
                success: false,
                rescode: 6002,
                message: 'This email is not registered'
            })
            return
        }

        const resetToken = crypto.randomBytes(16).toString('hex')

        await User.updateOne({email}, {
            $set: {
                resetToken
            }
        })

        const resetUrl = encodeURI(`${process.env.HOST}/resetpassword?reset_token=${resetToken}&email=${email}`)

        const emailContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify Your Email</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        text-align: center;
                        padding: 20px;
                    }
                    .container {
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        max-width: 500px;
                        margin: auto;
                    }
                    .btn {
                        display: inline-block;
                        background: #007bff;
                        color: #FFFFFF;
                        text-decoration: none;
                        padding: 12px 20px;
                        border-radius: 5px;
                        font-size: 16px;
                        margin-top: 20px;
                    }
                    .btn:hover {
                        background: #0056b3;
                    }
                    .url {
                        margin-top: 20px;
                        word-wrap: break-word;
                        color: #333;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Reset your Password</h2>
                    <p>Click the button below to reset your password and get back to your account.</p>
                    <a href="${resetUrl}" class="btn">Reset Password</a>
                    <p class="url">If the button doesn't work, copy and paste this URL into your browser:</p>
                    <p class="url"><a href="${resetUrl}">${resetUrl}</a></p>
                </div>
            </body>
            </html>
        `

        sendEmail(email, 'Reset your Password', emailContent)
        
        res.send({
            success: true,
            rescode: 6000,
            message: 'Reset Link sent to your email'
        })
    } catch(err) {
        res.send({
            success: false,
            rescode: 6003,
            message: 'Internal server error, please report this incident'
        })
        console.log(err)
    }
}
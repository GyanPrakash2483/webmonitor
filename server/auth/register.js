import User from '../models/UserSchema.js'
import crypto from 'node:crypto'
import dbConnect from '../utils/dbconnect.js'
import sendEmail from '../utils/email.js'

const userNameRegex = /^[a-zA-Z0-9]+$/
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/


/**
 * 
 * | Rescode      | Description                                            |
 * | ------------ | ------------------------------------------------------ |
 * | 6000         | Account Creation Successful, proceed for verification  |
 * | 6001         | Input Format Error                                     |
 * | 6002         | Username Already Exists                                |
 * | 6003         | Email Already Registered, try logging in               |
 * | 6004         | Unknown Server Error                                   |
 * 
 */
export default async function registerLocal(req , res) {
    try {
        const {userName, email, password} = req.body

        let isInputValid = true
        if(!userNameRegex.test(userName)) {
            isInputValid = false
        }

        if(!emailRegex.test(email)) {
            isInputValid = false
        }

        if(!passwordRegex.test(password)) {
            isInputValid = false
        }

        if(!isInputValid) {
            res.send({
                success: false,
                rescode: 6001,
                message: 'Input Format Error'
            })
            return
        }

        await dbConnect() // Make sure database is connected

        let emailMismatch = await User.findOne({email})
        if(emailMismatch) {
            res.send({
                success: false,
                rescode: 6003,
                message: 'Email Already Registered'
            })
            return
        }

        let userNameMismatch = await User.findOne({userName})
        if(userNameMismatch) {
            res.send({
                success: false,
                rescode: 6002,
                message: 'Username Already Exists'
            })
            return
        }

        // All Good, proceed to create account

        const salt = crypto.randomBytes(64).toString('base64')
        const hashIterations = 512
        const passwordHash = crypto.pbkdf2Sync(password, salt, hashIterations, 512, 'sha512').toString('base64')

        const user = await User.create({
            sub: crypto.randomBytes(16).toString('hex'),
            userName,
            email,
            additionalEmails: [
                {email}
            ],
            password: {
                salt,
                passwordHash,
                hashIterations
            },
            localAccount: true,
            googleAccount: false
        })

        res.send({
            success: true,
            rescode: 6000,
            message: 'Account created successfully'
        })

        const account_verification_url = `${process.env.HOST}/verifyaccount?uid=${user._id}`

        const emailBody = `
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
                    <h2>Verify Your Email</h2>
                    <p>Click the button below to verify your email address and activate your account.</p>
                    <a href="${account_verification_url}" class="btn">Verify Email</a>
                    <p class="url">If the button doesn't work, copy and paste this URL into your browser:</p>
                    <p class="url"><a href="${account_verification_url}">${account_verification_url}</a></p>
                </div>
            </body>
            </html>
        `

        sendEmail(email, 'Verify your email', emailBody)
    } catch(err) {
        console.log(err)
        res.send({
            success: false,
            rescode: 6004,
            message: 'Unknown server error'
        })
    }
}
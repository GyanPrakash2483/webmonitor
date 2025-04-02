import User from "../models/UserSchema.js"
import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv"
import sendEmail from '../utils/email.js'

configDotenv()

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/


export default async function loginLocal(req, res) {
    try{
        const {email, password} = req.body
        
        let isInputValid = true

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

        const userInDB = await User.findOne({email})

        if(!userInDB) {
            res.send({
                success: false,
                rescode: 6002,
                message: 'Account not registered, try logging in.'
            })
            return
        }

        if(!userInDB.password || JSON.stringify(userInDB.password) === '{}') {
            res.send({
                success: false,
                rescode: 6003,
                message: 'Account does not have a password, try logging in with google or set a password using reset password.'
            })
            return
        }

        if(!userInDB.verified) {
            res.send({
                success: false,
                rescode: 6006,
                message: 'Email not verified'
            })

            const account_verification_url = `${process.env.HOST}/verifyaccount?uid=${userInDB._id}`
            
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

            return
        }

        //Verify wether password is correct
        
        const salt = userInDB.password.salt
        const hashIterations = userInDB.password.hashIterations
        const passwordHash = crypto.pbkdf2Sync(password, salt, hashIterations, 512, 'sha512').toString('base64')

        if(passwordHash === userInDB.password.passwordHash) {
            // Login successfull, send auth token
            const JWTPayload = {
                uid: userInDB._id,
                email: userInDB.email
            }

            const jwt_token = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
                algorithm: 'HS512'
            })

            res.send({
                success: true,
                rescode: 6000,
                message: 'Logged in successfully',
                auth_token: jwt_token
            })

        } else {
            // Wrong password
            res.send({
                success: false,
                rescode: 6004,
                message: 'Wrong Password'
            })
        }
    } catch(err) {
        res.send({
            success: false,
            rescode: 6005,
            message: 'Internal server error, please report this incident'
        })

        console.log(err)
    }
}
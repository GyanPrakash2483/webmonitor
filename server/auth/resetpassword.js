import User from '../models/UserSchema.js'
import crypto from 'node:crypto'
import { configDotenv } from 'dotenv'
import dbConnect from '../utils/dbconnect.js'

configDotenv()
dbConnect()

export async function resetPassword(req, res) {
    
    try {
        const { email, resetToken, password } = req.body

        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        if(!email || !emailRegex.test(email)) {
            res.send({
                success: false,
                rescode: 6001,
                message: 'Invalid Email'
            })
            return
        }

        const userInDB = await User.findOne({email})
        if(!userInDB) {
            res.send({
                success: false,
                rescode: 6002,
                message: 'This email is not registered'
            })
            return
        }

        if(resetToken !== userInDB.resetToken) {
            res.send({
                success: false,
                rescode: 6003,
                message: 'Invalid password reset token'
            })
            return
        }

        const salt = crypto.randomBytes(64).toString('base64')
        const hashIterations = 512
        const passwordHash = crypto.pbkdf2Sync(password, salt, hashIterations, 512, 'sha512').toString('base64')

        await User.updateOne({email}, {
            $unset: {
                resetToken: ''
            },
            $set: {
                password: {
                    salt,
                    passwordHash,
                    hashIterations
                }
            }
        })
        
        res.send({
            success: true,
            rescode: 6000,
            message: 'Password has been reset'
        })
    } catch(err) {
        res.send({
            success: false,
            rescode: 6004,
            message: 'Internal server error, please report this incident'
        })
        console.log(err)
    }
}
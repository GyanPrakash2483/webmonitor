import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import User from '../models/UserSchema.js'

configDotenv()

export default async function getUserInfo(req, res) {
    try {
        const auth_token = req.headers.authorization.split(' ')[1]
        const {uid} = jwt.verify(auth_token, process.env.JWT_SECRET)
        const userinfo = await User.findById(uid)

        if(!userinfo) {
            throw Error('Account not found')
        }
        
        res.send({
            success: true,
            rescode: 6000,
            userData: {
                userName: userinfo.userName,
                emails: userinfo.additionalEmails
            }
        })
    } catch(err) {
        console.log(err)
        res.send({
            success: false,
            rescode: 6001,
            message: 'Authentication Error'
        })
    }
}
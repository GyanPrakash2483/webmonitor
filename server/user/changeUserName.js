import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import User from '../models/UserSchema.js'

configDotenv()

export default async function changeUserName(req, res) {
    try {
        const auth_token = req.headers.authorization.split(' ')[1]
        const { uid } = jwt.verify(auth_token, process.env.JWT_SECRET)
    
        const userNameRegex = /^[a-zA-Z0-9]+$/
        const newUserName = req.body.newUserName

        if(!userNameRegex.test(newUserName)) {
            res.send({
                success: false,
                rescode: 6002,
                message: 'Invalid Username'
            })
            return
        }

        const userNameInDB = await User.findOne({userName: newUserName})
        if(userNameInDB) {
            res.send({
                success: false,
                rescode: 6003,
                message: 'Username is already taken.'
            })
            return
        }

        const userInDB = await User.findById(uid)
        userInDB.userName = newUserName

        await userInDB.save()

        res.send({
            success: true,
            rescode: 6000,
            message: 'Username changed successfully'
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
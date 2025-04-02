import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import User from '../models/UserSchema.js'

configDotenv()

export default async function getSites(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({_id: uid})
        if(!user) {
            res.send({
                success: false,
                rescode: 6002,
                message: 'User not found.'
            })
            return
        }

        res.send({
            success: true,
            rescode: 6000,
            sites: user.sites
        })
        return

    } catch(err) {
        console.log(err)
        res.send({
            success: false,
            rescode: 6001,
            message: 'Authentication Error'
        })
    }
}
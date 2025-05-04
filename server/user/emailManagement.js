import jwt from "jsonwebtoken"
import User from "../models/UserSchema.js"

export default async function changeEmailPreference(req, res) {
    const auth_token = req.headers['authorization'].split(' ')[1]
    try {
        const user = jwt.verify(auth_token, process.env.JWT_SECRET)
        const userInDB = await User.findById(user.uid)
        const targetEmail = userInDB.additionalEmails.find(email => email._id.toString() === req.body.emailId)
        if(!targetEmail) {
            return res.send({
                success: false,
                rescode: 6002,
                message: 'Email not found'
            })
        }
        targetEmail.allowAlerts = req.body.allowAlerts
        targetEmail.allowMarketingMails = req.body.allowMarketingMails
        userInDB.save()
        
        return res.send({
            success: true,
            rescode: 6000,
            message: 'Email preference updated successfully',
        })
    } catch (err) {
        console.log(err)
        return res.send({
            success: false,
            rescode: 6001,
            message: 'Authentication Error'
        })
    }
}
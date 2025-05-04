import jwt from 'jsonwebtoken'
import User from '../models/UserSchema.js'

export default async function deleteAccount(req, res) {
    try {
        const auth_token = req.headers['authorization'].split(' ')[1]
        const user = jwt.verify(auth_token, process.env.JWT_SECRET)
        console.log(user)
        const deluser = await User.findByIdAndDelete(user.uid)
        if(!deluser) {
            return res.send({
                success: false,
                rescode: 6002,
                message: 'User not found',
            })
        }
        return res.send({
            success: true,
            rescode: 6000,
            message: 'User deleted successfully',
        })
    } catch (err) {
        console.log(err)
        return res.send({
            success: false,
            rescode: 6001,
            message: 'Authentication error',
        })
    }
}
import User from "../models/UserSchema.js"

export default async function verifyAccount(req, res) {
    try {
        const uid = req.body.uid

        if(!uid) {
            res.send({
                success: false,
                rescode: 6001,
                message: 'User ID not provided'
            })
            return
        }

        const user = User.findOne({
            _id: uid
        })

        if(!user) {
            res.send({
                success: false,
                rescode: 6002,
                message: 'User does not exist, please try to register again'
            })
        }

        const modifiedUser = await User.updateOne({
            _id: uid
        }, {
            $set: {
                verified: true
            }
        })

        if(modifiedUser.acknowledged) {
            res.send({
                success: true,
                rescode: 6000,
                message: 'User verified successfully'
            })
        } else {
            res.send({
                success: false,
                rescode: 6003,
                message: 'Database Error, Please report this incident.'
            })
        }
    } catch(err) {
        res.send({
            success: false,
            rescode: 6004,
            message: 'Server Error, Please report this incident.'
        })
        console.log(err)
    }
}
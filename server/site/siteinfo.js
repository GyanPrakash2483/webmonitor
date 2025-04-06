import jwt from 'jsonwebtoken'
import Site from '../models/SiteSchema.js'

export default async function siteInfo(req, res) {
    try {
        const auth_token = req.headers.authorization.split(' ')[1]
        jwt.verify(auth_token, process.env.JWT_SECRET)
        const siteid = req.params.siteid

        try {
            const site = (await Site.findById(siteid)).toObject()

            res.send({
                success: true,
                rescode: 6000,
                sitedata: {
                    ...site,
                    _id: undefined,
                    checkInterval: undefined,
                    subscribedUsers: undefined
                }
            })
        } catch(err) {
            console.log(err)
            res.send({
                success: false,
                rescode: 6002,
                message: 'Site not found'
            })
        }

    } catch(err) {
        console.log(err)
        res.send({
            success: false,
            rescode: 6001,
            message: 'Authentication Error'
        })
    }
}
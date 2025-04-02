import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import Site from '../models/SiteSchema.js'

configDotenv()

export default async function getSite(req, res) {
    try {
        const auth_token = req.headers.authorization.split(' ')[1]
        const { uid } = jwt.verify(auth_token, process.env.JWT_SECRET)

        if(!uid) {
            throw Error('User not found, auth error')
        }

        const site_id = req.params.siteid

        const {site, title, uptime, uptimeData} = await Site.findOne({_id: site_id})

        if(!site) {
            res.send({
                success: false,
                rescode: 6002,
                message: 'Requested site not found'
            })
            return
        }

        res.send({
            success: true,
            rescode: 6000,
            siteData: {
                site,
                title,
                uptime,
                uptimeData
            }
        })

    } catch(err) {
        console.log(err)
        res.send({
            success: false,
            rescode: 6001,
            message: 'Authentication Error'
        })
        return
    }
}
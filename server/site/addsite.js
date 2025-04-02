import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
import Site from '../models/SiteSchema.js'
import User from '../models/UserSchema.js'

configDotenv()

export default async function addSite(req, res) {
    try {
        const {site, title, checkInterval, alertIfDown} = req.body

        const authHeader = req.headers.authorization
        const auth_token = authHeader.split(' ')[1]
        const { uid } = jwt.verify(auth_token, process.env.JWT_SECRET)

        try {
            let siteInDB = await Site.findOne({site})
            if(siteInDB) {
                const userSubscribedToSite = await Site.findOne({
                    'subscribedUsers': {
                        $elemMatch: {
                            uid
                        }
                    }
                })
                if(!userSubscribedToSite) {
                    await Site.updateOne({site}, {
                        $set: {
                            checkInterval: Math.min(checkInterval, siteInDB.checkInterval)
                        },
                        $addToSet: {
                            subscribedUsers: {
                                uid,
                                alertIfDown
                            }
                        }
                    })
                } else {
                    res.send({
                        success: false,
                        rescode: 6003,
                        message: 'This website is already being monitored'
                    })
                    return
                }
            } else {
                await Site.create({
                    site,
                    title,
                    checkInterval,
                    subscribedUsers: [{
                        uid,
                        alertIfDown
                    }],
                })
            }

            siteInDB = await Site.findOne({site})

            await User.findOneAndUpdate({_id: uid}, {
                $addToSet: {
                    sites: siteInDB._id.toString()
                }
            })

            res.send({
                success: true,
                rescode: 6000,
                message: "New site added successfully"
            })
            return
        } catch(err) {
            console.log(err)
            res.send({
                success: false,
                rescode: 6002,
                message: "Internal server error, please report this incident."
            })
            return
        }

    } catch(err) {
        console.log(err)
        res.send({
            success: false,
            rescode: 6001,
            message: "Authentication Error"
        })
    }
}
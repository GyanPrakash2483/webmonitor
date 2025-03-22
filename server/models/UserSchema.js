import mongoose from "mongoose"
import dbConnect from "../utils/dbconnect.js"

await dbConnect() // Make sure database is connected

const UserSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    additionalEmails: {
        type: [
            {
                email: {
                    type: String,
                    required: true
                },
                allowAlerts: {
                    type: Boolean,
                    default: true
                },
                allowMarketingMails: {
                    type: Boolean,
                    default: true
                }
            }
        ],
        default: []
    },
    password: {
        salt: String,
        passwordHash: String,
        hashIterations: Number
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    localAccount: {
        type: Boolean,
        required: true
    },
    googleAccount: {
        type: Boolean,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)

export default User
import mongoose from "mongoose"
import dbConnect from "../utils/dbconnect.js"

await dbConnect() // Make sure database is connected

const UserSchema = new mongoose.Schema({
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
        salt: {
            type: String,
            required: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        hashIterations: {
            type: Number,
            required: true
        }
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
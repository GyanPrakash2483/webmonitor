import mongoose from 'mongoose';
import dbConnect from '../utils/dbconnect.js';

dbConnect()

const SiteSchema = new mongoose.Schema({
    site: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    checkInterval: {
        type: Number,
        required: true
    },
    subscribedUsers: {
        type: [
            {
                uid: String,
                alertIfDown: Boolean
            }
        ],
        default: []
    },
    uptime: {
        type: Number,
        default: 0
    },
    uptimeData: {
        type: [
            {
                timestamp: Date,
                up: Boolean,
                latency: Number
            },
        ],
        default: []
    }
})

const Site = mongoose.model('site', SiteSchema)

export default Site
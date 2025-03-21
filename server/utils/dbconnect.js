import mongoose from "mongoose"
import { configDotenv } from 'dotenv'

configDotenv()

export default async function dbConnect() {
    if(mongoose.connection.readyState != 1) {
        await mongoose.connect(process.env.MONGODB_CONN_STRING)
        console.log('Database Connected!')
    }
}
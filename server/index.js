import express from 'express'
import { configDotenv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import dbConnect from './utils/dbconnect.js'
import registerLocal from './auth/register.js'
import cors from 'cors'
import verifyAccount from './auth/verifyaccount.js'
import { googleAuth, googleAuthCallback } from './auth/google.js'
import loginLocal from './auth/login.js'

//configure environment
const __dirname = path.dirname(fileURLToPath(import.meta.url));
configDotenv()
const app = express()
app.use(express.json())
app.use(cors()) // To be removed in production

//connect to database
dbConnect()

// Test path to verify if api is working
app.get('/message', (_, res) => {
    res.send('<h1>Hello, World!</h1>')
})

// Routes

app.post('/auth/register/', async (req, res) => {
    registerLocal(req, res)
})

app.post('/auth/verifyaccount', async (req, res) => {
    verifyAccount(req, res)
})

app.get('/auth/google', async (req, res) => {
    googleAuth(req, res)
})

app.get('/auth/google/callback', async (req, res) => {
    googleAuthCallback(req, res)
})

app.post('/auth/login', async (req, res) => {
    loginLocal(req, res)
})

// Routes End

//serve frontend
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(`Error: ${err.message}`)
    } else {
        console.log(`Listening on port ${process.env.PORT}`)
    }
})
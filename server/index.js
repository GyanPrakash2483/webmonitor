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
import { forgotPassword } from './auth/forgotpassword.js'
import { resetPassword } from './auth/resetpassword.js'
import addSite from './site/addsite.js'
import getSites from './site/getSites.js'
import getSite from './site/getSite.js'

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

app.post('/forgotpassword', async (req, res) => {
    forgotPassword(req, res)
})

app.post('/resetpassword', async (req, res) => {
    resetPassword(req, res)
})

app.post('/site', async (req, res) => {
    addSite(req, res)
})

app.get('/site', async (req, res) => {
    getSites(req, res)
})

app.get('/site/:siteid', async (req, res) => {
    getSite(req, res)
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
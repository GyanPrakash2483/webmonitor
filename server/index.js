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
import pingController from './site/ping.js'
import './service/sitechecker.js'
import './service/unverifiedaccountcleaner.js'
import siteInfo from './site/siteinfo.js'
import getUserInfo from './user/getUserInfo.js'
import changeUserName from './user/changeUserName.js'

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

app.post('/auth/register/', registerLocal)

app.post('/auth/verifyaccount', verifyAccount)

app.get('/auth/google', googleAuth)

app.get('/auth/google/callback', googleAuthCallback)

app.post('/auth/login', loginLocal)

app.post('/forgotpassword', forgotPassword)

app.post('/resetpassword', resetPassword)

app.post('/site', addSite)

app.get('/site', getSites)

app.get('/site/:siteid', getSite)

app.get('/ping/:url', pingController)

app.get('/siteinfo/:siteid', siteInfo)

app.get('/userinfo', getUserInfo)

app.patch('/user/changeuname', changeUserName)

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
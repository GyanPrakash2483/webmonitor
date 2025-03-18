import User from '../../models/UserSchema.js'
import crypto from 'node:crypto'
import dbConnect from '../../utils/dbconnect.js'

const userNameRegex = /^[a-zA-Z0-9]+$/
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/

export default async function registerLocal(req , res) {
    const {userName, email, password} = req.body

    let isInputValid = true
    if(!userNameRegex.test(userName)) {
        isInputValid = false
    }

    if(!emailRegex.test(email)) {
        isInputValid = false
    }

    if(!passwordRegex.test(password)) {
        isInputValid = false
    }

    if(!isInputValid) {
        res.send({
            success: false,
            rescode: 6001,
            message: 'Input Format Error'
        })
        return
    }

    await dbConnect() // Make sure database is connected

    let userNameMismatch = await User.findOne({userName})
    if(userNameMismatch) {
        res.send({
            success: false,
            rescode: 6002,
            message: 'Username Already Exists'
        })
        return
    }

    let emailMismatch = await User.findOne({email})
    if(emailMismatch) {
        res.send({
            success: false,
            rescode: 6003,
            message: 'Email Already Registered'
        })
        return
    }

    // All Good, proceed to create account

    const salt = crypto.randomBytes(64).toString('base64')
    const hashIterations = 512
    const passwordHash = crypto.pbkdf2Sync(password, salt, hashIterations, 512, 'sha512').toString('base64')

    const user = await User.create({
        userName,
        email,
        additionalEmails: [
            {email}
        ],
        password: {
            salt,
            passwordHash,
            hashIterations
        },
        localAccount: true,
        googleAccount: false
    })

    console.log(user)

    res.send({
        success: true,
        rescode: 6000,
        message: 'Account created successfully'
    })
    
}
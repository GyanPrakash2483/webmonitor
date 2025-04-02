import { configDotenv } from 'dotenv'
import crypto from 'node:crypto'
import User from '../models/UserSchema.js'
import jwt from 'jsonwebtoken'

configDotenv()

const openIDEndpoints = await (await fetch('https://accounts.google.com/.well-known/openid-configuration')).json()
// console.log(openIDEndpoints)

export function googleAuth(_, res) {
    const authURL = new URL(openIDEndpoints.authorization_endpoint)
    authURL.searchParams.set('response_type', 'code')
    authURL.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID)
    authURL.searchParams.set('scope', 'openid email profile')
    authURL.searchParams.set('redirect_uri', `${process.env.HOST}/auth/google/callback`)
    authURL.searchParams.set('nonce', crypto.randomBytes(8).toString('hex'))

    res.redirect(authURL.href)

}

export async function googleAuthCallback(req, res) {
    const googleAuthExchangeCode = req.query.code

    const tokenRequestBody = new URLSearchParams()
    tokenRequestBody.set('code', googleAuthExchangeCode)
    tokenRequestBody.set('client_id', process.env.GOOGLE_CLIENT_ID)
    tokenRequestBody.set('client_secret', process.env.GOOGLE_CLIENT_SECRET)
    tokenRequestBody.set('redirect_uri', `${process.env.HOST}/auth/google/callback`)
    tokenRequestBody.set('grant_type', 'authorization_code')

    let googleAuthToken = await(await fetch(openIDEndpoints.token_endpoint, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: tokenRequestBody.toString()
        }
    )).json()

    if(!googleAuthToken.id_token) {
        res.send(`
            <h1> 403 Forbidden (GAuth Error) </h1>
            `)
        return;
    }

    const googleJWTPayload = googleAuthToken.id_token.split('.')[1] // Extract payload from token
    const base64Encoded = googleJWTPayload.replace(/-/g, '+',).replace(/_/g, '/'); // Convert base64url encoded payload to base64 encoding
    const padding = base64Encoded.length % 4 === 0 ? '' : '='.repeat(4 - (base64Encoded.length % 4));
    const paddedBase64 = base64Encoded + padding
    const decodedPayload = atob(paddedBase64).split('').map(char => String.fromCharCode(char.charCodeAt(0))).join('')
    const userData = JSON.parse(decodedPayload)

    const userInDB = await User.findOne({email: userData.email})
    if(userInDB) { // User is already registered
        await User.updateOne({email: userData.email}, {
            $set: {
                sub: userData.sub,
                verified: true,
                googleAccount: true
            }
        })

        const JWTPayload = {
            uid: userData._id,
            email: userData.email
        }

        const authToken = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
            algorithm: 'HS512',
        })

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <script type="text/javascript">
                    localStorage.setItem('auth_token', '${authToken}')
                    location.href = '/dashboard'
                </script>
            </head>
            <body>
                Webmonitor - GAuth
            </body>
            </html>
        `)
    } else { // User is not registered, create a new account
        const user = await User.create({
            sub: userData.sub,
            userName: `${userData.name.replace(' ', '_')}-g-${crypto.randomBytes(4).toString('hex')}`,
            email: userData.email,
            additionalEmails: [
                {
                    email: userData.email
                }
            ],
            verified: userData.email_verified,
            localAccount: false,
            googleAccount: true
        })

        if(!user) {
            res.send(`
                <h1> 403 Forbidden (GAuth Error) </h1>
                `)
            return;
        }

        const JWTPayload = {
            uid: userData._id,
            email: userData.email
        }

        const authToken = jwt.sign(JWTPayload, process.env.JWT_SECRET, {
            algorithm: 'HS512',
        })

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <script type="text/javascript">
                    localStorage.setItem('auth_token', '${authToken}')
                    location.href = '/dashboard'
                </script>
            </head>
            <body>
                Webmonitor - GAuth
            </body>
            </html>
        `)
    }
}
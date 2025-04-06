import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv';

configDotenv()

export default async function pingController(req, res) {

    const url = req.params.url

    if(!url) {
        res.send({
            ping: -1
        })
        return;
    }

    try {
        const auth_token = req.headers.authorization.split(' ')[1]

        jwt.verify(auth_token, process.env.JWT_SECRET)

        const t1 = Date.now()
        const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
              'Accept': '*/*',
              'Connection': 'keep-alive'
            },
            redirect: 'follow'
          })
        console.log(response.status)
        const t2 = Date.now()

        if(response.status !== 200) {
            res.send({
                ping: -1
            })
            return
        }

        res.send({
            ping: t2 - t1
        })
    } catch(err) {
        console.log(err)
        res.send({
            ping: -1
        })
    }
}
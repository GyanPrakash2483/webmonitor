import express from 'express'
import { configDotenv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

configDotenv()
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/message', (_, res) => {
    res.send('<h1>It Works</h1>')
})

app.use(express.static(path.join(__dirname, '../client/dist')))

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(`Error: ${err.message}`)
    } else {
        console.log(`Listening on port ${process.env.PORT}`)
        console.log(`http://localhost:${process.env.PORT}`)
    }
})
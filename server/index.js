import express from 'express'
import { configDotenv } from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import dbConnect from './utils/dbconnect.js';
import registerLocal from './routes/register/local.js';

//configure environment
const __dirname = path.dirname(fileURLToPath(import.meta.url));
configDotenv()
const app = express()
app.use(express.json())

//connect to database

dbConnect()

// Test path to verify if api is working
app.get('/message', (_, res) => {
    res.send('<h1>Hello, World!</h1>')
})

// Routes

app.post('/register/local', async (req, res) => {
    await registerLocal(req, res);
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
        console.log(`http://localhost:${process.env.PORT}`)
    }
})
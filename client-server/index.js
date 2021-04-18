import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import options from './options.js'

// INITIAL

const server = express()

// MIDDLEWARES
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors())

// ROUTES

import auth from './routes/auth.js'
server.use(auth)

// LISTENER
server.listen(options.PORT, () => {
    console.log(`Listening on port ${options.PORT}`)
})
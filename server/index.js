/* 

    $$$$$$$\                      $$\           $$\ 
    $$  __$$\                     \__|          $$ |
    $$ |  $$ | $$$$$$\  $$\   $$\ $$\  $$$$$$\  $$ |
    $$$$$$$\ |$$  __$$\ \$$\ $$  |$$ | \____$$\ $$ |
    $$  __$$\ $$ /  $$ | \$$$$  / $$ | $$$$$$$ |$$ |
    $$ |  $$ |$$ |  $$ | $$  $$<  $$ |$$  __$$ |$$ |
    $$$$$$$  |\$$$$$$  |$$  /\$$\ $$ |\$$$$$$$ |$$ |
    \_______/  \______/ \__/  \__|\__| \_______|\__|

    NAME: Boxial Server
    AUTHOR: Carlos Pomares (https://www.github.com/pomaretta)
    VERSION: 1.0

*/

// CUSTOM IMPORTS
import banner from './util/banner.js'

// EXTERNAL IMPORTS
import express from 'express'
import bodyParser from 'body-parser'

/* 

    SERVER

*/

const server = express()

/* 

    MIDDLEWARES

*/

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

/* 

    ROUTES

*/

import vBoxRoutes from './routes/api/vbox.js'

server.use(vBoxRoutes)

// LISTENER
server.listen(8000 | process.env.NODE_PORT, () => {

    console.log(banner())

})
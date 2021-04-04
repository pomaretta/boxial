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
import options from './options.js'
import * as fs from 'fs/promises'

// EXTERNAL IMPORTS
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

/* 

    UTILITIES

*/

// CREATE LOG DIRECTORIES IF NOT EXISTS
let rootExists = false;
try {
    await fs.mkdir("./" + options.LOGS.DIRECTORY);
    rootExists = true;
} catch (err){
    rootExists = true;
}
// CREATE INFO AND ERROR DIRECTORY
try {
    console.log(rootExists)
    if(rootExists){
        await fs.mkdir("./" + options.LOGS.DIRECTORY + "/" + options.LOGS.TYPE.INFO)
    }
} catch (err) {
    //
}
try {
    if(rootExists){
        await fs.mkdir("./" + options.LOGS.DIRECTORY + "/" + options.LOGS.TYPE.ERRORS)
    }
} catch (err) {
    //
}

/* 

    SERVER

*/

const server = express()

/* 

    MIDDLEWARES

*/

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors())

/* 

    ROUTES

*/

import vBoxRoutes from './routes/api/vbox.js'

server.use(vBoxRoutes)

// LISTENER
server.listen(8000 | process.env.NODE_PORT, () => {

    console.log(banner())

})
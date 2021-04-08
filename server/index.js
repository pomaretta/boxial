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

// UTILITY IMPORTS
import virtualbox from 'virtualbox'

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

// CREATE DB DIRECTORY
try {
    await fs.mkdir("./" + options.DB.DIRECTORY);
} catch (err) {
    //
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

    VBOX MACHINES DB

*/

try {
    await fs.open("./" + options.DB.DIRECTORY + "/" + options.DB.DATA)
} catch (error) {

    // CREATE FILE AND MAP MACHINES
    let machines = []

    await virtualbox.list((m,e) => {

        let index = 0;

        Object.entries(m).forEach(([key,value]) => {
            machines.push({
                uuid: key,
                name: value.name,
                index: index
            })
            index++;
        })
        
        fs.writeFile("./" + options.DB.DIRECTORY + "/" + options.DB.DATA,JSON.stringify(machines))
        .catch(err => console.log(err))
        
    })

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
import systemRoutes from './routes/api/system.js' 

server.use(vBoxRoutes)
server.use(systemRoutes)

// LISTENER
server.listen(8000 | process.env.NODE_PORT, () => {

    console.log(banner())

})
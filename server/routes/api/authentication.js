/* 

    Auth API

    VERSION: 1.0

*/

// IMPORTS

import { Router } from 'express'
import bcrypt from 'bcrypt'
import options from '../../options.js'
import query from '../../auth/database.js'

// INIT

const authentication = Router()

// POST
authentication.post('/api/signup', async (req,res) => {

    const username = req.body.user.username
    const password = await bcrypt.hashSync(req.body.user.password,10)
    const save = await query(`INSERT INTO Users(username,password) VALUES ('${username}','${password}')`)
     
    res.sendStatus(200)
})

authentication.post('/api/login', async (req,res) => {
    
    const username = req.body.user.username;
    const user = await query(`SELECT * FROM Users WHERE username = '${username}'`)

    bcrypt.compare(req.body.user.password,user[0].password,(error,value) => {
        if(error) throw error
        if(value){
            res.json({
                user: username,
                auth: true
            })
        } else {
            res.json({
                user: username,
                auth: false
            })   
        }
    })

})

export default authentication
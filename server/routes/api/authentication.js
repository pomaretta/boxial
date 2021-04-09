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
// authentication.post('/api/signup', async (req,res) => {

//     const username = req.body.user.username
//     const password = await bcrypt.hashSync(req.body.user.password,10)
//     const save = await query(`INSERT INTO Users(username,password) VALUES ('${username}','${password}')`)
//     const user = await query(`SELECT * FROM Users WHERE username = '${username}'`)
//     const saveUUID = await query(`INSERT INTO user_session VALUES (${user[0].id},'${createUUID()}')`) 

//     res.sendStatus(200)
// })

authentication.post((options.API.AUTH.PREFIX + options.API.AUTH.LOGIN), async (req,res) => {

    if(req.body.user){

        const username = req.body.user.username;
        const user = await query(`SELECT * FROM Users WHERE username = '${username}'`)

        if(Object.entries(user).length == 0){
            res.sendStatus(400)
        }
        
        try {
            bcrypt.compare(req.body.user.password,user[0].password,async (error,value) => {
                if(error) throw error
                if(value){
                    const r = await query(`SELECT * FROM user_session WHERE user = ${user[0].id}`)
                    res.json({
                        session: r[0].id,
                        auth: true
                    })
                } else {
                    res.json({
                        auth: false
                    })   
                }
            })
        } catch (err) {
            //
        }
        
    }

    if(req.body.session){
        const session = await query(`SELECT * FROM user_session WHERE id = '${req.body.session}'`)
        if(Object.entries(session).length > 0){
            res.json({
                auth: true
            })
        } else {
            res.json({
                auth: false
            })
        }
    }

})

authentication.post((options.API.AUTH.PREFIX + options.API.AUTH.UPDATE.PREFIX + options.API.AUTH.UPDATE.PASSWORD), async (req,res) => {

    const id = req.body.session
    const password = await bcrypt.hashSync(req.body.password,10)
    
    const user = await query(`SELECT A.id FROM users A INNER JOIN user_session B ON A.id = B.user WHERE B.id = '${id}'`)
    query(`UPDATE users SET password = '${password}' WHERE id = ${user[0].id}`)

    res.sendStatus(200)
})

const createUUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export default authentication
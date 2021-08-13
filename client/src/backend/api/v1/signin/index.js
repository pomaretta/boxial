/*
    SIGN IN API
*/

import { Router } from 'express'
import bcrypt from 'bcrypt'

import database from '../../../services/mysql/database.js'

const api = Router()

const query = database(
    process.env.MYSQL_HOST,
    process.env.MYSQL_PORT,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    process.env.MYSQL_DATABASE
).getQuery()

/**
 * Authenticate user and return his Session Id, that identified the user in the system.
 */
api.post('/login', async (req, res) => {
    
    // Check if the user is supplied.
    if (!req.body.user) res.json({"auth": false,"message": "user not supplied"})

    // Get incoming user and password.
    const username = req.body.user.username
    const password = req.body.user.password

    // Get the id and password with the user supplied.
    const user = await query(`SELECT id, password FROM Users WHERE username = '${username}' LIMIT 1`)
    
    // Check if there's an user on the result, otherwise means that the user doesn't exist.
    if(Object.entries(user).length == 0) res.json({"auth": false,"message": "user not found"})

    try {
        // Compare the incoming password with the database password.
        await bcrypt.compare(password,user[0].password, (err, value) => {
            if (err) throw err
            if (!value) res.json({"auth": false,"message": "wrong password"})
            // After successfully checked the incoming password, get the sessionid of the user.
            const session = await query(`SELECT id FROM user_session WHERE user = ${user[0].id}`)
            res.json({
                "auth": true,
                "sessionid": session[0].id,
                "message": "login successful"
            })
        })
    } catch (e) {
        res.json({"auth": false,"message": e})
    }

})

export default api
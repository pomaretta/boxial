/*
    AUTH API
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

api.post('/', async (req, res) => {

    if (!req.headers.sessionid) res.json({"auth": false, "message": "session not supplied"})

    const sessionid = req.headers.sessionid
    const session = await query('SELECT id FROM user_session WHERE id = ?', sessionid)

    // Check if there's an user on the result, otherwise means that the user doesn't exist.
    if(Object.entries(session).length == 0) res.json({"auth": false,"message": "session not found"})

    res.json({"auth": true,"message": "successful authentication"})
})

export default api
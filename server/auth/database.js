import mysql from 'mysql'
import { promisify } from 'util'
import credentials from '../env/db-credentials.js'

const pool = mysql.createPool(credentials)

pool.getConnection(err => {
    if(err) throw err
})

const query = promisify(pool.query).bind(pool)

export default query
// ======================== //
// DATABASE SERVICE         //
// ======================== //

import { promisify } from 'util'
import mysql from 'mysql'

class Database {

    /**
     * 
     * Contructs a database and connects it to.
     * 
     * @param {String} host 
     * @param {Integer} port 
     * @param {String} user 
     * @param {String} password 
     * @param {String} database 
     */
    constructor(host,port,user,password,database) {
        this.config = {
            host: host,
            port: port,
            user: user,
            password: password,
            database: database
        }
    }

    getQuery(){
        // Create pool
        const pool = mysql.createPool(this.config)

        // Get connection
        pool.getConnection((err) => {
            if (err) throw err
        })

        // Promisify Query
        return promisify(pool.query).bind(pool)
    }

}

export default Database
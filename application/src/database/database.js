/**
 * Creates pool connection with mysql database.
 *
 * Pool connection allows for more dyncamic connections and recycling of database instances
 *
 * source: https://medium.com/@mhagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
 * 
 * @author Ibraheem Chaudry.
 */

const util = require('util')
const mysql = require('mysql')

//Initialize the pool with a set connection limit
const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'gatortrader.cdnacoov8a86.us-west-1.rds.amazonaws.com',
    port:'3306',
    user: 'admin',
    password: 'csc648_team10',
    //working database name, actual database is 'gatortrader'
    // database: 'gatortrader_test'
    database: 'gatortrader'
})

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) {
        connection.release();
        console.log("Connection made")
    }
    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)
module.exports = pool

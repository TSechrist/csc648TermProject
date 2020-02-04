/**
 * This module intializes a list with the category types directly from the database.
 *
 * To use in any other module just import module and use the init() function to return a list of categories
 *
 * @author Ibraheem Chaudry.
 */

var pool = require('./database')

var categories = []

//fetches all categories from database 
const init = () => {
    pool.query("SELECT * FROM category", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            if (categories.length == 0) {
                for (let i = 0; i < result.length; i++) {
                    categories.push(result[i].type)
                }
            }
        }
    })
    return categories
}

module.exports = { init }
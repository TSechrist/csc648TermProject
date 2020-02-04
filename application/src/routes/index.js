/**
 * This module contains route for the home page
 *
 * Handles the routing and rendering of webpages.
 *
 * @author Alexander Beers.
 */

const express = require('express'), router = express.Router()
const initCategories = require('../database/initCategories')
const pool = require('../database/database')

//Initializes categories of items for database
var categories = initCategories.init()

//Route for Home Page
router.get("/", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        //initialize homepage to show 8 most recent results
        pool.query("SELECT * FROM item WHERE approved = 1 ORDER BY date_upload DESC LIMIT 0, 8", (err, result) => {
            if (err) {
                console.log(err)
            }
            // console.log(result)
            res.render('home', {
                searchResult: result,
                categories: categories,
                isLogin: req.session.loggedin,
                feedbackMessage: "Recent posts on Gator Trader",
                userName: req.session.name
            })
        })
    })
})

module.exports = router
